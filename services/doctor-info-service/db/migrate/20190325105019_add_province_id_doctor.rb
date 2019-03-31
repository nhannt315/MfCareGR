class AddProvinceIdDoctor < ActiveRecord::Migration[5.2]
  def change
    add_reference :doctors, :province, index: true
  end
end
