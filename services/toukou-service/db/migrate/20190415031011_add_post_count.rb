class AddPostCount < ActiveRecord::Migration[5.2]
  def change
    add_column :toukous, :posts_count, :integer, default: 0
  end
end
