class MedicineClassesController < ApplicationController
  def index
    @medicine_classes = MedicineClass.all
  end
end
