class CreateDisease < ActiveRecord::Migration[5.2]
  def change
    create_table :diseases do |t|
      t.string :name
      t.text :content_html

      t.timestamps
    end
  end
end
