class MedicineTypesController < ApplicationController
  before_action :get_params, only: [:show]

  def show
    @medicine_type = MedicineType.find_by(slug: params[:id])
    @medicines = @medicine_type.medicines.page(@page).per(30)
  end


  private

  def get_params
    @page = params[:page] || 1
    @item_per_page = 30
  end
end
