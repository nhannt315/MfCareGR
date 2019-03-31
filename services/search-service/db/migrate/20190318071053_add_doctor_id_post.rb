class AddDoctorIdPost < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :doctor_id, :integer, index: true
    add_column :posts, :user_profile_id, :integer, index: true
    add_column :posts, :poster_type, :string
  end
end
