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
end
