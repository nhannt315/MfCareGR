class CreateDoctorDegrees < ActiveRecord::Migration[5.2]
  def change
    create_table :doctor_degrees do |t|
      t.references :doctor
      t.references :degree
      t.timestamps
    end
  end
end
