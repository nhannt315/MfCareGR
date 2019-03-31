class MedicineType < ApplicationRecord
  extend FriendlyId
  belongs_to :medicine_class
  has_many :medicines

  friendly_id :medicine_type_slug, use: :slugged

  def medicine_type_slug
    "#{name}-#{id}"
  end
end
