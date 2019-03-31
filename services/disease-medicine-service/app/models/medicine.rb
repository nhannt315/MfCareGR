class Medicine < ApplicationRecord
  extend FriendlyId
  belongs_to :medicine_type

  friendly_id :medicine_slug, use: :slugged

  def medicine_slug
    "#{name}-#{id}"
  end

  def same_type limit = 10
    Medicine.where("medicine_type_id = ? and id not in (?)",
                   medicine_type_id, id).limit limit
  end
end
