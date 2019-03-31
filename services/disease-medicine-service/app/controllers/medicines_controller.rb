class MedicinesController < ApplicationController
  before_action :get_params, only: [:index]

  def show
    medicine = Medicine.friendly.find(params[:id])
    render json: medicine.to_json(include: [:medicine_type])
  end

  def index
    total = Medicine.count
    medicines = Medicine.all.page(@page).per(@item_per_page)
    render json: {
        medicines: medicines,
        total: (total / 30.to_f).ceil
    }
  end

  def same_type
    medicine = Medicine.friendly.find(params[:id])
    render json: medicine.same_type
  end

  def total
    render json: {total: Medicine.count}
  end

  private

  def get_params
    @page = params[:page] || 1
    @item_per_page = 30
  end
end
