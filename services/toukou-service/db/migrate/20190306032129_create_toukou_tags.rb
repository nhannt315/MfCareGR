class CreateToukouTags < ActiveRecord::Migration[5.2]
  def change
    create_table :toukou_tags do |t|
      t.integer :tag_id
      t.references :toukou
      t.timestamps
    end
  end
end
