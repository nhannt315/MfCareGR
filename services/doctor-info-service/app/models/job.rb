class Job < ApplicationRecord
  extend FriendlyId
  has_many :doctors
  friendly_id :job_slug, use: :slugged

  def job_slug
    "#{Vietnameses.convert_unicode(name)}"
  end
end
