class AddMoreColumnDisease < ActiveRecord::Migration[5.2]
  def change
    add_column :diseases, :images, :string
    add_column :diseases, :brief, :text
    add_column :diseases, :overview, :text
    add_column :diseases, :summary, :text
    add_column :diseases, :cause, :text
    add_column :diseases, :prevent, :text
    add_column :diseases, :treatment, :text
  end
end
