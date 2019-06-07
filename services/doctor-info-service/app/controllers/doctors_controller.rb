class DoctorsController < ApplicationController

  before_action :authorize_admin, only: [:admin_doctor_list, :admin_doctor_detail, :approve, :decline, :update]

  def index
    page = params[:page] || 1
    per_page = params[:item_per_page] || 10
    doctors = Doctor.order(view_count: :desc)
    doctors = doctors.where(province_id: params[:place]) if params[:place]
    doctors = doctors.includes(:specialities).where(specialities: {id: params[:speciality]}) if params[:speciality]
    doctors = doctors.where(job_id: params[:job]) if params[:job]
    doctors = doctors.includes(:languages).where(languages: {id: params[:language]}) if params[:language]
    doctors = doctors.includes(:ranks).where(ranks: {id: params[:ranks]}) if params[:ranks]
    doctors = doctors.includes(:degress).where(degrees: {id: params[:degrees]}) if params[:degrees]
    doctors = doctors.page(page).per(per_page)
    total_page = (doctors.total_count / 10.to_f).ceil
    render json: {
        total_page: total_page,
        doctors: doctors
    }, include: [:job, :ranks, :degrees, :specialities]
  end

  def approve
    doctor = Doctor.find(params[:id])
    unless doctor.user_profile_id
      render json: {message: "Doctor not registered yet!"}, status: :bad_request
      return
    end
    doctor.update_attribute :activated, true
    user = UserInfoService.new([doctor.user_profile_id]).call[0]
    DoctorMailPublisher.new(
        user["email"],
        "Tài khoản đã được xác minh",
        "Xin chào bác sĩ $#{user["name"]}, tài khoản của bạn đã được xác minh, vui lòng đăng nhập với tài khoản đã đăng ký và cập nhật hồ sơ của mình"
    ).call
    render json: {message: "Success"}, status: :ok
  end

  def decline
    doctor = Doctor.find(params[:id])
    unless doctor.user_profile_id
      render json: {message: "Doctor not registered yet!"}, status: :bad_request
      return
    end
    doctor.update_attribute :activated, false
    user = UserInfoService.new([doctor.user_profile_id]).call[0]
    DoctorMailPublisher.new(
        user["email"],
        "Tài khoản không được chấp thuận",
        "Xin chào  $#{user["name"]}, tài khoản của bạn không được chấp nhận"
    ).call
    render json: {message: "Success"}, status: :ok
  end

  def admin_doctor_detail
    doctor = Doctor.find(params[:id])
    if doctor.user_profile_id
      user = UserInfoService.new([doctor.user_profile_id]).call[0]
      doctor.user = user
    end
    render json: doctor, include: [:job, :ranks, :degrees, :specialities], methods: [:user]
  end

  def admin_doctor_list
    page = params[:page] || 1
    per_page = params[:item_per_page] || 10
    mode = params[:mode] || "unregistered"
    if mode == "unregistered"
      doctors = Doctor.where(user_profile_id: nil).order(created_at: :desc)
    elsif mode == "pending"
      doctors = Doctor.where(activated: false).where.not(user_profile_id: nil).order(created_at: :desc)
    elsif mode == "activated"
      doctors = Doctor.where(activated: true).where.not(user_profile_id: nil).order(created_at: :desc)
    end
    doctors = doctors.search(params[:keyword]) if params[:keyword]
    doctors = doctors.page(page).per(per_page)
    user_ids = []
    total_page = (doctors.total_count / per_page.to_f).ceil
    doctors.each {|doctor| user_ids.push(doctor.user_profile_id) if doctor.user_profile_id}
    if user_ids.length > 0 && mode != "unregistered"
      users = UserInfoService.new(user_ids).call
      doctors.each do |doctor|
        next unless doctor.user_profile_id
        doctor.user = find_user users, doctor.user_profile_id
      end
    end
    render json: {
        total_page: total_page,
        doctors: doctors
    }, include: [:job, :ranks, :degrees, :specialities], methods: [:user]
  end

  def show
    doctor = Doctor.friendly.find(params[:id])
    render json: doctor, include: [:job, :ranks, :degrees, :specialities, :medical_services, :languages]
  end

  def create
    doctor = Doctor.new(
        name: params[:name],
        place: params[:place],
        identity_image: params[:identity_img],
        license_image: params[:license_img],
        speciality_ids: params[:specialities],
        activated: false
    )
    if doctor.save
      payload = {
          email: params[:email],
          name: params[:name],
          password: params[:password],
          password_confirm: params[:password_confirm],
          doctor_id: doctor.id,
          phone: params[:phone]
      }
      begin
        user = RegisterDoctorUserService.new(payload).call
        doctor.update_attribute :user_profile_id, user["id"]
        user["doctor"] = doctor
        render json: user, status: :ok
      rescue HttpService::ServiceResponseError => error
        render json: error.message, status: :bad_request
      end
    else
      render json: {message: doctor.errors.full_messages}, status: :bad_request
    end
  end

  def update
    doctor = Doctor.find(params[:id])
    doctor.name = params[:name] if params[:name]
    doctor.speciality_ids = params[:specialities] if params[:specialities]
    doctor.rank_ids = params[:ranks] if params[:ranks]
    doctor.degree_ids = params[:degrees] if params[:degrees]
    doctor.positions = params[:positions] if params[:positions]
    doctor.experiences = params[:experiences] if params[:experiences]
    doctor.training_process = params[:training_process] if params[:training_process]
    doctor.awards = params[:awards] if params[:awards]
    if doctor.save
      render json: doctor, include: [:job, :ranks, :degrees, :specialities, :medical_services, :languages]
    else
      render json: {message: doctor.errors.full_messages}, status: :bad_request
    end
  end

  def get_info
    doctor = Doctor.find(params[:id])
    render json: doctor
  end

  def get_by_ids
    doctors = Doctor.where(id: params[:doctor_ids])
    render json: doctors, include: [:job]
  end

  def total
    render json: {total: Doctor.count}
  end

end
