class UserTagController < ApplicationController
  skip_before_action :authorize_request, only: [:get_user_tag]

  def get_user_tag
    tag_ids = params[:tag_ids]
    render json: {message: "Missing tag ids"}, status: :unprocessable_entity unless tag_ids
    result = []
    tag_ids.each do |tag_id|
      tmp = {}
      tmp["tag_id"] = tag_id
      tmp["user_ids"] = UserTag.where(tag_id: tag_id).map {|user_tag| user_tag.user_profile_id}
      result.push tmp
    end
    render json: result, status: :ok
  end

  def remove_tag
    tag_id = params[:tag_id]
    render json: {message: "Missing tag_id"}, status: :unprocessable_entity unless tag_id
    tag = UserTag.where(user_profile_id: @current_user.id, tag_id: tag_id)[0]
    if tag.destroy
      render json: {message: "Success"}, status: :ok
    else
      render json: {message: "System error"}, status: :internal_server_error
    end
  end

  def add_tag
    tag_id = params[:tag_id]
    render json: {message: "Missing tag_id"}, status: :unprocessable_entity unless tag_id
    if UserTag.create(user_profile_id: @current_user.id, tag_id: tag_id)
      render json: {message: "Success"}, status: :ok
    else
      render json: {message: "System error"}, status: :internal_server_error
    end
  end
end