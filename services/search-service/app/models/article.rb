require "elasticsearch/model"

class Article < ApplicationRecord
  extend FriendlyId
  friendly_id :article_slug, use: :slugged
  include Searchable
  include PgSearch
  multisearchable against: [:title, :intro]
  # pg_search_scope :search,
  #                 against: [:title],
  #                 using: {
  #                     tsearch: {prefix: true}
  #                 }
  settings index: {number_of_shards: 1} do
    mappings dynamic: "false" do
      indexes :title, type: "text", analyzer: "ngram_analyzer",
              search_analyzer: "whitespace_analyzer"
      indexes :intro, type: "text", analyzer: "ngram_analyzer",
              search_analyzer: "whitespace_analyzer"
    end
  end
  def article_slug
    "#{Vietnameses.convert_unicode(title)}"
  end
end
