class Medicine < ApplicationRecord
  extend FriendlyId
  include Searchable
  include PgSearch
  belongs_to :medicine_type
  friendly_id :medicine_slug, use: :slugged
  multisearchable against: [:name]
  # pg_search_scope :search,
  #                 against: [:name],
  #                 using: {
  #                     tsearch: {prefix: true}
  #                 }

  settings index: {number_of_shards: 1} do
    mappings dynamic: "false" do
      indexes :name
    end
  end
  
  def medicine_slug
    "#{name}-#{id}"
  end
end
