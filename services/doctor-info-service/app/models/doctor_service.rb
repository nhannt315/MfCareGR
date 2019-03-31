class DoctorService < ApplicationRecord
  belongs_to :doctor
  belongs_to :medical_service
end
