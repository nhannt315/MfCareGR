class AddDoctorPlaceActive < ActiveRecord::Migration[5.2]
  def change
    add_column :doctors, :place, :string
    change_column :doctors, :activated, :boolean, default: false
  end
end
