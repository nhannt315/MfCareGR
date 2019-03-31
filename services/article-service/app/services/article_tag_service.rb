class ArticleTagService < HttpService
  attr_reader :tag_id_arr
  def initialize(tag_id_arr)
    @tag_id_arr = tag_id_arr
  end

  def call
    get
  end

  private

  def conn
    Faraday.new(url: "http://tag-app:3000")
  end

  def get
    resp = conn.get "/tags/get_tags_by_ids", payload

    if resp.success?
      JSON.parse resp.body
    else
      raise ServiceResponseError
    end
  end

  def payload
    {tag_ids: tag_id_arr}
  end
end
