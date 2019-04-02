class DoctorsController < ApplicationController

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

  def show
    doctor = Doctor.friendly.find(params[:id])
    render json: doctor, include: [:job, :ranks, :degrees, :specialities, :medical_services, :languages]
  end

  def get_info
    doctor = Doctor.find(params[:id])
    render json: doctor
  end

  def get_by_ids
    doctors = Doctor.where(id: params[:doctor_ids])
    render json: doctors
  end

  def total
    render json: {total: Doctor.count}
  end

end
