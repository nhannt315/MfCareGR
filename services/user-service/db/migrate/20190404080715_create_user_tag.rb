class CreateUserTag < ActiveRecord::Migration[5.2]
  def change
    create_table :user_tags do |t|
      t.references :user_profile, index: true
      t.integer :tag_id
    end
  end
end
