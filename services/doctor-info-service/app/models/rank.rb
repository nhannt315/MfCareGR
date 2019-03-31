class Rank < ApplicationRecord
  extend FriendlyId
  friendly_id :rank_slug, use: :slugged

  def rank_slug
    "#{Vietnameses.convert_unicode(name)}"
  end
end
