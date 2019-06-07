class ToukousController < ApplicationController

  before_action :get_params, only: [:index]
  before_action :authorize_request, only: [:create, :update]

  def index
    mode = params[:mode] || "all"
    if mode == "all"
      @threads = Toukou.order(updated_at: :desc).page(@page).per(@item_per_page)
    end
    if mode == "most_commented"
      @threads = Toukou.most_commented.page(@page).per(@item_per_page)
    end
    if mode == "unanswered "
      @threads = Toukou.unanswered.page(@page).per(@item_per_page)
    end
    if params[:doctor_id]
      @threads = Toukou.order(updated_at: :desc).includes(:posts)
                     .where(posts: {is_question: true, doctor_id: params[:doctor_id]}).page(@page).per(@item_per_page)
    end
    if params[:tag_ids]
      @threads = @threads.includes(:toukou_tags).where(toukou_tags: {tag_id: params[:tag_ids]})
    end
    @has_more = @item_per_page.to_i * @page.to_i < @threads.total_count.to_i
    user_id_arr = []
    tag_id_arr = []
    doctor_id_arr = []
    @threads.each do |thread|
      thread.question = thread.post
      user_id_arr.push thread.question.user_profile_id
      tag_ids = thread.tag_ids
      tag_id_arr.concat tag_ids
      doctor_id_arr.push(thread.question.doctor_id) if thread.question.doctor_id
    end
    doctors = PostDoctorService.new(doctor_id_arr.uniq).call
    users = PostUserService.new(user_id_arr.uniq).call
    tags = ThreadTagService.new(tag_id_arr.uniq).call
    @threads.each do |thread|
      thread.question.author = find_user users, thread.question.user_profile_id
      thread.tags = find_tag tags, thread.tag_ids
      thread.question.assignment = find_user(doctors, thread.question.doctor_id) if thread.question.doctor_id
    end
  end

  def create
    content = params[:content]
    hiding_creator = params[:hiding_creator] || false
    doctor_id = params[:doctor_id]
    @thread = Toukou.new(
        name: pleasant(content),
        published: false,
        thread_title: pleasant(content)
    )
    @thread.save
    @post = Post.create(
        user_profile_id: @current_user.id,
        doctor_id: doctor_id,
        body_raw: content,
        poster_type: "customer",
        hiding_creator: hiding_creator,
        is_question: true,
        toukou_id: @thread.id
    )
    tag_slugs = PredictService.new(content).call["result"]
    tags = ThreadTagService.new(tag_slugs, "slug").call
    tags.each do |tag|
      ToukouTag.create(tag_id: tag["id"], toukou_id: @thread.id)
    end
    @post.author = @current_user
    @thread.tags = tags
    @thread.question = @post
    if @current_user.followers.length > 0
      FollowedUserThreadPublisher.new(@current_user.id, @current_user.followers, @thread).call
    end
  end

  def update
    content = params[:content]
    hiding_creator = params[:hiding_creator] || false
    @thread = Toukou.find(params[:id])
    @post = @thread.post
    if @post.user_profile_id != @current_user.id
      render json: {message: 'No permission'}, status: :forbidden
    end
    @post.update_attributes(
        body_raw: content,
        hiding_creator: hiding_creator
    )
    @thread.tags = ThreadTagService.new(@thread.tag_ids, "id").call
    user_id_arr = [@post.user_profile_id]
    user = PostUserService.new(user_id_arr.uniq).call[0]
    @post.author = user
    @thread.question = @post
  end

  def show
    @thread = Toukou.find_by slug: params[:id]
    @thread = Toukou.find_by id: params[:id] unless @thread
    unless @thread
      render json: {message: "Not found"}, status: :not_found
      return
    end
    @thread.tags = ThreadTagService.new(@thread.tag_ids).call
    @post = @thread.post
    user_id_arr = [@post.user_profile_id]
    @post.get_children
    @post.children.each do |child|
      user_id_arr.push child.user_profile_id
    end

    users = PostUserService.new(user_id_arr.uniq).call
    @post.author = find_user users, @post.user_profile_id
    @post.children.each do |child|
      child.author = find_user users, child.user_profile_id
    end
  end

  def get_comment_detail
    thread = Toukou.friendly.find(params[:id])
    @post = thread.post
    user_id_arr = [@post.user_profile_id]
    @post.get_children
    @post.children.each do |child|
      user_id_arr.push child.user_profile_id
    end

    users = PostUserService.new(user_id_arr.uniq).call
    @post.author = find_user users, @post.user_profile_id
    @post.children.each do |child|
      child.author = find_user users, child.user_profile_id
    end
  end

  private

  def get_params
    @page = params[:page] || 1
    @item_per_page = params[:item_per_page] || 10
  end
end
