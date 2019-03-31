class Post < ApplicationRecord
  include Searchable
  include PgSearch
  multisearchable against: [:body_raw]
  # pg_search_scope :search,
  #                 against: [:body_raw],
  #                 using: {
  #                     tsearch: {prefix: true}
  #                 }
  after_validation :log_errors, :if => Proc.new {|m| m.errors}

  settings index: {number_of_shards: 1} do
    mappings dynamic: "false" do
      indexes :body_raw, type: "text", analyzer: "ngram_analyzer",
              search_analyzer: "whitespace_analyzer"
    end
  end

  def log_errors
    Rails.logger.debug self.errors.full_messages.join("\n")
  end
end
