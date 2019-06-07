class Relationship < ApplicationRecord
  belongs_to :follower, class_name: "UserProfile"
  belongs_to :followed, class_name: "UserProfile"
  validates :follower_id, presence: true
  validates :followed_id, presence: true
end
