class AddActiveIdentityLicense < ActiveRecord::Migration[5.2]
  def change
    add_column :doctors, :activated, :boolean, default: :false
    add_column :doctors, :identity_image, :string
    add_column :doctors, :license_image, :string
  end
end
