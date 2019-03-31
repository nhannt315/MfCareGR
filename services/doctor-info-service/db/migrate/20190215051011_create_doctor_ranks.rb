class CreateDoctorRanks < ActiveRecord::Migration[5.2]
  def change
    create_table :doctor_ranks do |t|
      t.references :doctor
      t.references :rank
      t.timestamps
    end
  end
end
