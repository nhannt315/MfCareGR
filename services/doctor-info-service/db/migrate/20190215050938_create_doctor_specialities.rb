class CreateDoctorSpecialities < ActiveRecord::Migration[5.2]
  def change
    create_table :doctor_specialities do |t|
      t.references :doctor
      t.references :speciality
      t.timestamps
    end
  end
end
