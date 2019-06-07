class TagsController < ApplicationController
  before_action :authorize_request, only: [:add_remove_tag]
  def add_remove_tag
    action = params[:action_tag]
    thread_id = params[:thread_id]
    thread = Toukou.find(thread_id)
    if @current_user.id != thread.post.user_profile_id
      render json: {message: "No permission"}, status: :forbidden
    end
    tag_id = params[:tag_id]
    if action == "add"
      ToukouTag.create(toukou_id: thread_id, tag_id: tag_id)
    elsif action == "remove"
      toukou_tags = ToukouTag.where(toukou_id: thread_id).where(tag_id: tag_id)
      render status: :not_found if toukou_tags.length == 0
      toukou_tags[0].destroy
    end
    render json: {status: "success"}, status: :ok
  end

  def get_toukou_tags
    tag_ids = params[:tag_ids]
    render json: {message: "Missing tag ids"}, status: :unprocessable_entity unless tag_ids
    result = []
    tag_ids.each do |tag_id|
      tmp = {}
      tmp["tag_id"] = tag_id
      tmp["thread_ids"] = ToukouTag.where(tag_id: tag_id).map {|toukou_tag| toukou_tag.toukou_id}
      result.push tmp
    end
    render json: result, status: :ok
  end
end
