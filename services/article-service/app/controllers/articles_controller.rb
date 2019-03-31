class ArticlesController < ApplicationController
  before_action :get_params, only: [:index]

  def index
    @articles = Article.page(@page).per(@item_per_page)
    has_more =  Article.count.to_i > (@page.to_i * @item_per_page.to_i)
    render json: {has_more: has_more, articles: @articles}
  end

  def show
    @article = Article.friendly.find(params[:id])
    tag_ids = @article.article_tags.map {|tag| tag.tag_id}
    @tags = ArticleTagService.new(tag_ids).call
  end

  def get_top
    @articles = Article.order(published_date: :desc).limit(4)
    @total = Article.count
    render json: {
      articles: @articles,
      total: @total
    }
  end

  def related_articles
    tag_ids = params[:tag_ids]
    articles = Article.related_articles(tag_ids).distinct.limit(15)
    render json: articles
  end

  private
  def get_params
    @page = params[:page] || 1
    @item_per_page = params[:item_per_page] || 5
  end
end
