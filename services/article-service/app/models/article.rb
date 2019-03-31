class Article < ApplicationRecord
  extend FriendlyId
  has_many :article_tags
  friendly_id :article_slug, use: :slugged

  scope :related_articles, (lambda do |article_tag_ids|
    joins(:article_tags).where(article_tags: {tag_id: article_tag_ids})
  end
  )

  def article_slug
    "#{Vietnameses.convert_unicode(title)}"
  end
end
