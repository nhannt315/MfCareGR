class RegisterDoctorUserService < HttpService
  attr_reader :payload
  def initialize(payload)
    @payload = payload
  end

  def call
    post
  end

  private

  def conn
    Faraday.new(url: "http://user-app:3000")
  end

  def post
    resp = conn.post "/signup_doctor", payload

    if resp.success?
      JSON.parse resp.body
    else
      raise ServiceResponseError, resp.body
    end
  end

end
