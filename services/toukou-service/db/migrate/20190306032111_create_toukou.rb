class CreateToukou < ActiveRecord::Migration[5.2]
  def change
    create_table :toukous do |t|
      t.integer :vicare_id
      t.text :name
      t.boolean :published
      t.datetime :last_answered_post_at
      t.string :thread_title
      t.integer :view_count
      t.timestamps
    end
  end
end
