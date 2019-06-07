class ArticlesController < ApplicationController
  before_action :get_params, only: [:index, :get_recent_crawl]

  def index
    @articles = Article.where.not(published_date: nil).order(published_date: :desc).page(@page).per(@item_per_page)
    if params[:tag_ids]
      @articles = @articles.includes(:article_tags).where(article_tags: {tag_id: params[:tag_ids]})
    end
    has_more = Article.count.to_i > (@page.to_i * @item_per_page.to_i)
    render json: {has_more: has_more, articles: @articles, total: @articles.total_count}
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

  def get_total
    recommend_count = 0
    if params[:tag_ids]
      recommend_count = Article.includes(:article_tags).where(article_tags: {tag_id: params[:tag_ids]}).count
    end
    render json: {total: Article.count, recommend_total: recommend_count}
  end

  def get_latest_date
    latest_date = Article.where.not(published_date: nil).order(published_date: :desc).first.published_date.to_time.to_i
    render json: {latest_date: latest_date}
  end

  def get_recent_crawled
    articles = Article.where("published_date < ?", 15.days.ago).order(published_date: :desc).page(@page).per(@item_per_page)
    render json: articles
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
