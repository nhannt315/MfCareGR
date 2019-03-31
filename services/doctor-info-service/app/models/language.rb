class Language < ApplicationRecord
  extend FriendlyId
  has_many :doctors
  friendly_id :language_slug, use: :slugged

  def language_slug
    "#{Vietnameses.convert_unicode(name)}"
  end
end
