class SpecialitiesController < ApplicationController
  def index
    specialities = Speciality.all
    render json: specialities, methods: [:doctor_count]
  end
end