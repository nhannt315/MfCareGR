class AddColumnUser < ActiveRecord::Migration[5.2]
  def change
    add_column :user_profiles, :phone, :string
  end
end
