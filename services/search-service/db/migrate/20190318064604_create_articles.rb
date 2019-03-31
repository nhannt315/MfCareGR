class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.integer :vicare_id
      t.string :title, index: true
      t.string :slug
      t.text :description
      t.datetime :published_date
      t.string :author
      t.string :medium_image
      t.string :homepage_image
      t.string :large_image
      t.string :thumbnail_image
      t.text :body_html
      t.text :intro
      t.text :title
    end
  end
end
