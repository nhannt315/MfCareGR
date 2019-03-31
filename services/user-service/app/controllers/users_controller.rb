class UsersController < ApplicationController

  skip_before_action :authorize_request, only: [:create, :show, :get_users_by_ids]

  def show
    user = UserProfile.find_by(id: params[:id])
    render json: user
  end

  def get_users_by_ids
    @users = UserProfile.where(id: params[:user_ids])
    doctor_ids = []
    @users.each {|user| doctor_id.push(user.doctor_ids) if user.doctor_id}
    if doctor_ids.length > 0
      doctors = UserDoctorService.new(doctor_ids.uniq).call
      @users.each do |user|
        next unless user.doctor_id
        user.doctor = find_doctor doctors, user.doctor_id
      end
    end
  end

  # POST /signup
  # return authenticated token upon signup
  def create
    user = UserProfile.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = {message: Message.account_created, auth_token: auth_token}
    json_response(response, :created)
  end

  def get_user_info
    render json: current_user, include: :province, status: :ok
  end

  private

  def user_params
    params.permit(
        :name,
        :email,
        :password,
        :password_confirmation
    )
  end
end
