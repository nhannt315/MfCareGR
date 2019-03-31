class AddDoctorUser < ActiveRecord::Migration[5.2]
  def change
    add_column :user_profiles, :doctor_id, :integer
  end
end
