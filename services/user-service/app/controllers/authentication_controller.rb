class AuthenticationController < ApplicationController

  skip_before_action :authorize_request

  # return auth token once user is authenticated
  def authenticate
    auth_token = AuthenticateUser.new(auth_params[:email], auth_params[:password]).call
    user = UserProfile.find_by email: auth_params[:email]
    user.doctor = UserDoctorService.new([user.doctor_id]).call[0] if user.doctor_id
    json_response({
                      auth_token: auth_token,
                      user_data: user
                  })
  end

  private

  def auth_params
    params.permit(:email, :password)
  end
end
