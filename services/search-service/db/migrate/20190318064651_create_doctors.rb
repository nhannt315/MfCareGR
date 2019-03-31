class CreateDoctors < ActiveRecord::Migration[5.2]
  def change
    create_table :doctors do |t|
      t.string :name
      t.string :slug
      t.text :info
      t.string :data_images
      t.string :positions
      t.string :experiences
      t.string :training_process
      t.string :awards
      t.integer :job_id
      t.integer :user_profile_id
      t.timestamps
    end
  end
end
