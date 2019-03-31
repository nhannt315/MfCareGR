class AddViewCountDoctor < ActiveRecord::Migration[5.2]
  def change
    add_column :doctors, :view_count, :integer
  end
end
