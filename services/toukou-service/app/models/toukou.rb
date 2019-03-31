class Toukou < ApplicationRecord
  extend FriendlyId
  has_many :toukou_tags
  has_many :posts, dependent: :destroy
  friendly_id :toukou_slug, use: :slugged
  attr_accessor :question
  attr_accessor :tags

  def post
    Post.where(toukou_id: id, is_question: true)[0]
  end

  def tag_ids
    toukou_tags.map {|tag| tag.tag_id}
  end

  def toukou_slug
    "#{Vietnameses.convert_unicode(name)}-#{id}"
  end
end
