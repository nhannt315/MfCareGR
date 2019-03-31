class PostDoctorService < HttpService
  attr_reader :doctor_ids
  def initialize(doctor_ids)
    @doctor_ids = doctor_ids
  end

  def call
    get
  end

  private

  def conn
    Faraday.new(url: "http://doctor-app:3000")
  end

  def get
    resp = conn.get "/doctors/get_by_ids", payload

    if resp.success?
      JSON.parse resp.body
    else
      raise ServiceResponseError
    end
  end

  def payload
    {doctor_ids: doctor_ids}
  end
end