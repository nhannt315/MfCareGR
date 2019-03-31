class CreateDoctorServices < ActiveRecord::Migration[5.2]
  def change
    create_table :doctor_services do |t|
      t.references :doctor
      t.references :medical_service
      t.timestamps
    end
  end
end
