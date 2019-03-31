class CreateTags < ActiveRecord::Migration[5.2]
  def change
    create_table :tags do |t|
      t.string :name
      t.string :slug
      t.text :description
      t.timestamps
      t.timestamps
    end
  end
end
