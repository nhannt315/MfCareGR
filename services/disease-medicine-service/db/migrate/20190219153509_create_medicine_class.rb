class CreateMedicineClass < ActiveRecord::Migration[5.2]
  def change
    create_table :medicine_classes do |t|
      t.string :name
      t.string :slug
      t.timestamps
    end
  end
end
