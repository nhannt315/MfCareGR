class PostsController < ApplicationController
  before_action :authorize_request, only: [:create, :delete, :destroy, :update]

  def create
    thread = Toukou.find_by(id: params[:thread_id])

    poster_type = if @current_user.doctor_id
                    "professional"
                  else
                    "customer"
                  end
    @post = Post.new(
      is_question: false,
      user_profile_id: @current_user.id,
      body_raw: params[:content],
      hiding_creator: params[:hiding_creator] || false,
      poster_type: poster_type,
      toukou_id: params[:thread_id],
      parent_id: thread.post.id
    )
    @post.author = @current_user
    unless @post.save
      render json: {message: "Something is fucked up"}, status: :bad_request
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.user_profile_id != @current_user.id
      render json: {message: "No Permission"}, status: :forbidden
    end
    @post.author = @current_user
    unless @post.update_attributes body_raw: params[:content]
      render json: {message: "Something is fucked up"}, status: :internal_server_error
    end
  end

  def destroy
    post = Post.find(params[:id])
    if post.user_profile_id != @current_user.id
      render json: {message: "No Permission"}, status: :forbidden
    end

    if post.delete
      render json: {message: "Success"}, status: :accepted
    else
      render json: {message: "Error happened"}, status: :internal_server_error
    end
  end
end

