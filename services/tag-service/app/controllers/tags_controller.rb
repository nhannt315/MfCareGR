class TagsController < ApplicationController

  def index
    keyword = params[:keyword]
    tags = Tag.search_by_name(keyword).limit(20)
    render json: tags
  end

  def show
    tag = Tag.find_by slug: params[:id]
    unless tag
      render json: {message: "Not found"}, status: :not_found
      return
    end
    user_result = UserTagService.new([tag.id]).call
    thread_result = ThreadTagService.new([tag.id]).call
    article_result = ArticleTagService.new([tag.id]).call
    tag.user_ids = find_user_tag user_result, tag.id
    tag.thread_ids = find_thread_tag thread_result, tag.id
    tag.article_ids = find_article_tag article_result, tag.id
    render json: tag, methods: [:user_ids, :thread_ids, :article_ids]
  end

  def search_tag
    keyword = params[:keyword]
    render json: {message: "Missing keyword"}, status: :unprocessable_entity unless keyword
    tags = Tag.search_by_name(keyword).limit(10)
    tag_ids = tags.map {|tag| tag.id}
    user_result = UserTagService.new(tag_ids).call
    thread_result = ThreadTagService.new(tag_ids).call
    tags.each do |tag|
      tag.user_ids = find_user_tag user_result, tag.id
      tag.thread_ids = find_thread_tag thread_result, tag.id
    end
    render json: tags, methods: [:user_ids, :thread_ids]
  end

  def get_tags_by_ids
    tag_ids = params[:tag_ids]
    tags = Tag.where(id: tag_ids)
    if params[:detail]
      puts "test #{params[:tag_ids]}"
      if tag_ids.kind_of?(String)
        tag_ids = [tag_ids]
      end
      user_result = UserTagService.new(tag_ids).call
      thread_result = ThreadTagService.new(tag_ids).call
      tags.each do |tag|
        tag.user_ids = find_user_tag user_result, tag.id
        tag.thread_ids = find_thread_tag thread_result, tag.id
      end
    end
    render json: tags, methods: [:user_ids, :thread_ids]
  end

  def get_tags_by_slugs
    tag_slugs = params[:tag_ids]
    tags = Tag.where(slug: tag_slugs)
    render json: tags
  end
end
