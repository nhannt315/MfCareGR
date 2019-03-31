class Speciality < ApplicationRecord
  extend FriendlyId
  friendly_id :speciality_slug, use: :slugged
  has_many :doctor_specialities
  has_many :doctors, through: :doctor_specialities

  def speciality_slug
    "#{Vietnameses.convert_unicode(name)}"
  end

  def doctor_count
    doctors.count
  end
end
