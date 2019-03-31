class Province < ApplicationRecord
  extend FriendlyId
  has_many :doctors
  friendly_id :province_slug, use: :slugged

  def province_slug
    "#{Vietnameses.convert_unicode(name)}"
  end
end
