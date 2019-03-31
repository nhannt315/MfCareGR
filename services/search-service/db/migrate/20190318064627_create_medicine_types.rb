class CreateMedicineTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :medicine_types do |t|
      t.string :name
      t.string :slug
      t.references :medicine_class
      t.timestamps
    end
  end
end
