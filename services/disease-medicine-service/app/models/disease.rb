class Disease < ApplicationRecord
  extend FriendlyId
  friendly_id :disease_slug, use: :slugged

  scope :name_asc, ->{order "name ASC"}
  scope :exclude_content, ->{select "id, name, slug"}
  scope :view_count_desc, -> {order "view_count DESC"}

  def disease_slug
    "#{name}-#{id}"
  end

  serialize :images, Array
end
