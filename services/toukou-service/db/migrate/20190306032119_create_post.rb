class CreatePost < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.integer :vicare_id
      t.references :toukou
      t.integer :parent_id
      t.boolean :hiding_creator
      t.boolean :is_question
      t.text :body
      t.text :body_raw
      t.text :body_search
      t.integer :doctor_id
      t.integer :user_profile_id
      t.string :poster_type
      t.timestamps
    end
  end
end
