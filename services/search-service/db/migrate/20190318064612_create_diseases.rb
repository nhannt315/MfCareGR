class CreateDiseases < ActiveRecord::Migration[5.2]
  def change
    create_table :diseases do |t|
      t.string :name, index: true
      t.text :content_html
      t.string :images
      t.text :brief, index: true
      t.text :overview
      t.text :summary
      t.text :cause
      t.text :prevent
      t.text :treatment
      t.timestamps
    end
  end
end
