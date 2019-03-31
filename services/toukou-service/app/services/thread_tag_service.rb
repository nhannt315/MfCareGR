class ThreadTagService < HttpService
  attr_reader :tag_arr, :type
  def initialize(tag_arr, type="id")
    @tag_arr = tag_arr
    @type = type
  end

  def call
    get
  end

  private

  def conn
    Faraday.new(url: "http://tag-app:3000")
  end

  def get
    resp = if type == "id"
             conn.get "/tags/get_tags_by_ids", payload
           elsif type == "slug"
             conn.get "/tags/get_tags_by_slugs", payload
           end

    if resp.success?
      JSON.parse resp.body
    else
      raise ServiceResponseError
    end
  end

  def payload
    {tag_ids: tag_arr}
  end
end