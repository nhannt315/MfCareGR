class Degree < ApplicationRecord
  extend FriendlyId
  friendly_id :degree_slug, use: :slugged

  def degree_slug
    "#{Vietnameses.convert_unicode(name)}"
  end
end
