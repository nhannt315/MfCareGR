class LikeController < ApplicationController
  before_action :authorize_request, only: [:create, :destroy]
  before_action :find_post, only: [:create]

  def create
    Like.create!(user_profile_id: @current_user.id, post_id: @post.id)
    render json: {message: "Success"}, status: :created
  end

  def destroy
    @post = Post.find params[:id]
    like = Like.find_by(user_profile_id: @current_user.id, post_id: @post.id)
    like.destroy
    render json: {message: "Not found"}, status: :not_found unless like
    render json: {message: "Success"}, status: :ok
  end

  private

  def find_post
    @post = Post.find params[:post_id]
  end
end