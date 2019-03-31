class MedicineType < ApplicationRecord
  belongs_to :medicine_class
  has_many :medicines
end
