class Tag < ApplicationRecord
  include PgSearch
  attr_accessor :user_ids, :thread_ids, :article_ids
  pg_search_scope :search_by_name,
                  against: [:name],
                  using: {
                      tsearch: {prefix: true}
                  }
  scope :search, (lambda do |keyword|
    keyword = keyword.to_s.strip
    where "name LIKE ? ", "%#{sanitize_sql_like keyword}%" unless keyword.blank?
  end)
end
