class CreateDoctorLanguages < ActiveRecord::Migration[5.2]
  def change
    create_table :doctor_languages do |t|
      t.references :doctor
      t.references :language
      t.timestamps
    end
  end
end
