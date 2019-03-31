class AddInteractionMedicine < ActiveRecord::Migration[5.2]
  def change
    add_column :medicines, :interaction, :text
  end
end
