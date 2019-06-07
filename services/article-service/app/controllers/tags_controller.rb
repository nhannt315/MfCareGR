class TagsController < ApplicationController
  def get_article_tags
    tag_ids = params[:tag_ids]
    render json: {message: "Missing tag ids"}, status: :unprocessable_entity unless tag_ids
    result = []
    tag_ids.each do |tag_id|
      tmp = {}
      tmp["tag_id"] = tag_id
      tmp["article_ids"] = ArticleTag.where(tag_id: tag_id).map {|article_tag| article_tag.article_id}
      result.push tmp
    end
    render json: result, status: :ok
  end
end