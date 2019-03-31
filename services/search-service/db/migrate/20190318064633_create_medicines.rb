class CreateMedicines < ActiveRecord::Migration[5.2]
  def change
    create_table :medicines do |t|
      t.string :name
      t.string :slug
      t.string :image
      t.references :medicine_type
      t.string :company
      t.text :overview
      t.text :instruction
      t.text :info
      t.text :warning
      t.text :contraindication
      t.text :side_effect
      t.text :note
      t.text :overdose
      t.text :preservation
      t.timestamps
    end
  end
end
