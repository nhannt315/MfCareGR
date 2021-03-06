class Doctor < ApplicationRecord
  extend FriendlyId
  friendly_id :doctor_slug, use: :slugged
  has_many :doctor_languages
  has_many :languages, through: :doctor_languages
  has_many :doctor_services
  has_many :medical_services, through: :doctor_services
  has_many :doctor_specialities
  has_many :specialities, through: :doctor_specialities
  has_many :doctor_ranks
  has_many :ranks, through: :doctor_ranks
  has_many :doctor_degrees
  has_many :degrees, through: :doctor_degrees
  belongs_to :job, optional: true
  belongs_to :province, optional: true

  attr_accessor :user

  scope :search, (lambda do |keyword|
    keyword = keyword.to_s.strip
    where "name LIKE ? ", "%#{sanitize_sql_like keyword}%" unless keyword.blank?
  end)

  def doctor_slug
    "#{Vietnameses.convert_unicode(name)}-#{id}"
  end

  serialize :training_process, Array
  serialize :data_images, Array
  serialize :positions, Array
  serialize :experiences, Array
  serialize :awards, Array
end
