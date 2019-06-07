class UsersController < ApplicationController

  skip_before_action :authorize_request, only: [:create, :show, :get_users_by_ids, :create_doctor, :get_users]

  def show
    user = UserProfile.find_by(id: params[:id])
    render json: user
  end

  def change_password
    AuthenticateUser.new(current_user.email, params[:current_password]).call
    if current_user.update_attributes(
        password: params[:new_password],
        password_confirmation: params[:new_confirm]
    )
      render json: {message: "Success"}, status: :ok
    else
      render json: {message: current_user.errors.full_message}, status: :bad_request
    end
  end

  def get_users_by_ids
    @users = UserProfile.where(id: params[:user_ids])
    doctor_ids = []
    @users.each {|user| doctor_ids.push(user.doctor_id) if user.doctor_id}
    if doctor_ids.length > 0
      doctors = UserDoctorService.new(doctor_ids.uniq).call
      @users.each do |user|
        next unless user.doctor_id
        user.doctor = find_doctor(doctors, user.doctor_id)[0]
        puts user.doctor
      end
    end
  end

  def get_users
    @users = UserProfile.where(id: params[:user_ids])
    render json: @users
  end

  # POST /signup
  # return authenticated token upon signup
  def create
    user = UserProfile.new user_params
    if user.save
      auth_token = AuthenticateUser.new(user.email, user.password).call
      response = {user_data: user, token: auth_token}
      json_response(response, :created)
    else
      render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def create_doctor
    user = UserProfile.new(
        name: params[:name],
        email: params[:email],
        password: params[:password],
        password_confirmation: params[:password_confirm],
        doctor_id: params[:doctor_id],
        phone: params[:phone]
    )
    if user.save
      render json: user, status: :ok
    else
      render json: {message: user.errors.full_messages}, status: :bad_request
    end
  end

  def update
    user = UserProfile.find params[:id]
    unless user.id == current_user.id
      render json: {message: "Permission denied"}, status: :forbidden
      return
    end
    if user.update_attributes(
        name: params[:name],
        display_name: params[:display_name],
        gender: params[:gender],
        dob: params[:dob],
        province_id: params[:province_id],
        address: params[:address],
        phone: params[:phone],
        avatar: params[:avatar]
    )
      render json: user, status: :ok
    else
      render json: {message: "Update error"}, status: :bad_request
    end
  end

  def get_user_info
    if current_user.doctor_id
      current_user.doctor = UserDoctorService.new([current_user.doctor_id]).call[0]
    end
    render json: current_user, except: :password_digest, status: :ok
  end

  def follow
    target_user = UserProfile.find params[:user_id]
    @current_user.follow target_user
    render json: {
        message: "Followed successfully!"
    }, status: :ok
  end

  def unfollow
    target_user = UserProfile.find params[:user_id]
    @current_user.unfollow target_user
    render json: {
        message: "Unfollowed successfully!"
    }, status: :ok
  end

  private

  def user_params
    params.permit(
        :name,
        :email,
        :password,
        :password_confirmation,
        :phone
    )
  end
end
