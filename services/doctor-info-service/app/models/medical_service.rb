class MedicalService < ApplicationRecord
  has_many :doctor_services
  has_many :doctors, through: :doctor_services
end
