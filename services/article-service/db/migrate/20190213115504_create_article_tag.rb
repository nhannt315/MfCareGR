class CreateArticleTag < ActiveRecord::Migration[5.2]
  def change
    create_table :article_tags do |t|
      t.references :article
      t.integer :tag_id

      t.timestamps
    end
  end
end
