class AuthorizationService < HttpService
  attr_reader :token
  def initialize(token)
    @token = token
  end

  def call
    get
  end

  private

  def conn
    Faraday.new(url: "http://user-app:3000")
  end

  def get
    resp = conn.get do |req|
      req.url "/get_user_info"
      req.headers['Authorization'] = token
    end

    if resp.success?
      JSON.parse resp.body
    else
      raise ServiceResponseError
    end
  end
end