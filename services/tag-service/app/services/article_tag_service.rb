class ArticleTagService < HttpService
  attr_reader :tag_ids
  def initialize(tag_ids)
    @tag_ids = tag_ids
  end

  def call
    get
  end

  private

  def conn
    Faraday.new(url: "http://article-app:3000")
  end

  def get
    resp = conn.get "/get_articles_by_tag_ids", payload

    if resp.success?
      JSON.parse resp.body
    else
      raise ServiceResponseError
    end
  end

  def payload
    {tag_ids: tag_ids}
  end
end