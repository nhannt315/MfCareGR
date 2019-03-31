class AddSlugToDisease < ActiveRecord::Migration[5.2]
  def change
    add_column :diseases, :slug, :string
  end
end
