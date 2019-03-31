class CreateLikeTable < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.references :post, index: true
      t.integer :user_profile_id, index: true
    end
  end
end
