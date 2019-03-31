class Disease < ApplicationRecord
  include Searchable
  include PgSearch
  extend FriendlyId
  friendly_id :disease_slug, use: :slugged
  multisearchable against: [:name]
  # pg_search_scope :search,
  #                 against: [:name],
  #                 using: {
  #                     tsearch: {prefix: true}
  #                 }

  settings index: {number_of_shards: 1} do
    mappings dynamic: "false" do
      indexes :name, type: "text", analyzer: "ngram_analyzer",
              search_analyzer: "whitespace_analyzer"
    end
  end
  def disease_slug
    "#{name}-#{id}"
  end
  serialize :images, Array
end
