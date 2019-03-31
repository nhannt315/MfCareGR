class AddSlugToToukous < ActiveRecord::Migration[5.2]
  def change
    add_column :toukous, :slug, :string
    add_index :toukous, :slug, unique: true
  end
end
