class PostUserService < HttpService
  attr_reader :user_ids
  def initialize(user_ids)
    @user_ids = user_ids
  end

  def call
    get
  end

  private

  def conn
    Faraday.new(url: "http://user-app:3000")
  end

  def get
    resp = conn.get "/users/get_users_by_ids", payload

    if resp.success?
      JSON.parse resp.body
    else
      raise ServiceResponseError
    end
  end

  def payload
    {user_ids: user_ids}
  end
end