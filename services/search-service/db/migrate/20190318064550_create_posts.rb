class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.integer :vicare_id
      t.integer :toukou_id
      t.integer :parent_id
      t.boolean :hiding_creator
      t.boolean :is_question
      t.text :body
      t.text :body_raw, index: true
      t.text :body_search
      t.timestamps
    end
  end
end
