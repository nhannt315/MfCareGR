class ThreadUserService < HttpService
  attr_reader :user_id
  def initialize(user_id)
    @user_id = user_id
  end

  def call
    get
  end

  private

  def conn
    Faraday.new(url: "http://user-app:3000")
  end

  def get
    resp = conn.get "/users/#{user_id}"

    if resp.success?
      JSON.parse resp.body
    else
      raise ServiceResponseError
    end
  end
end