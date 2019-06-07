class ProvincesController < ApplicationController

  skip_before_action :authorize_request

  def index
    provinces = Province.all
    render json: provinces, status: :ok
  end
end
