class TagsController < ApplicationController

  def index
    keyword = params[:keyword]
    tags = Tag.search_by_name(keyword).limit(20)
    render json: tags
  end

  def get_tags_by_ids
    tag_ids = params[:tag_ids]
    tags = Tag.where(id: tag_ids)
    render json: tags
  end

  def get_tags_by_slugs
    tag_slugs = params[:tag_ids]
    tags = Tag.where(slug: tag_slugs)
    render json: tags
  end
end
