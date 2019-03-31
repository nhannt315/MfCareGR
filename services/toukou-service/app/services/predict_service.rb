class PredictService < HttpService
  attr_reader :content

  def initialize(content)
    @content = content
  end

  def call
    get
  end

  private

  def conn
    Faraday.new(url: "http://predict-app:5000")
  end

  def get
    resp = conn.post do |req|
      req.url "/predict"
      req.headers['Content-Type'] = 'application/json'
      body = {content: content}.to_json
      req.body = body
      puts req
    end

    if resp.success?
      JSON.parse resp.body
    else
      raise ServiceResponseError
    end
  end

  def payload
    {content: content}
  end
end