class AddIndex < ActiveRecord::Migration[5.2]
  def change
    add_index :posts, :parent_id
  end
end
