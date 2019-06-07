class Post < ApplicationRecord
  belongs_to :toukou, counter_cache: true
  attr_accessor :author, :children, :assignment
  has_many :likes
  after_validation :log_errors, :if => Proc.new {|m| m.errors}

  def log_errors
    Rails.logger.debug self.errors.full_messages.join("\n")
  end

  def get_children
    @children = Post.where(is_question: false, parent_id: id)
  end

  def child_count
    Post.where(is_question: false, parent_id: id).count
  end

  def parent
    Post.find_by(id: parent_id)
  end

  def has_parent?
    parent_id != nil
  end

  def likers
    likes.map {|like| like.user_profile_id}
  end

  def user
    ThreadUserService.new(user_profile_id).call
  end
end
