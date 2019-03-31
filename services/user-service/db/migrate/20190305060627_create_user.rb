class CreateUser < ActiveRecord::Migration[5.2]
  def change
    create_table :user_profiles do |t|
      t.string :name
      t.integer :gender
      t.string :username
      t.string :password_digest
      t.boolean :is_staff
      t.references :province
      t.string :full_name
      t.datetime :dob
      t.string :address
      t.string :display_name
      t.string :avatar
      t.string :email
      t.integer :vicare_id
      t.timestamps
    end
  end
end
