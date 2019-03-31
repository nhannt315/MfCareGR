class Doctor < ApplicationRecord
  include Searchable
  include PgSearch
  multisearchable against: [:name]
  pg_search_scope :search,
                  against: [:name],
                  using: {
                      tsearch: {prefix: true}
                  }

  settings index: {number_of_shards: 1} do
    mappings dynamic: "false" do
      indexes :name, type: "text", analyzer: "ngram_analyzer",
              search_analyzer: "whitespace_analyzer"
    end
  end

  serialize :training_process, Array
  serialize :data_images, Array
  serialize :positions, Array
  serialize :experiences, Array
  serialize :awards, Array
end
