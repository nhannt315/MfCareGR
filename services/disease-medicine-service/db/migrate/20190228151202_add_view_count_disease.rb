class AddViewCountDisease < ActiveRecord::Migration[5.2]
  def change
    add_column :diseases, :view_count, :integer, default: 0
  end
end
