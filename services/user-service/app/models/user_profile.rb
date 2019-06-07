class UserProfile < ApplicationRecord
  belongs_to :province, optional: true
  # enum gender: {undefine: 0, male: 1, female: 2}
  has_secure_password
  validates_presence_of :name, :email, :password_digest
  attr_accessor :doctor
  has_many :user_tags
  has_many :active_relationships, class_name: "Relationship",
           foreign_key: "follower_id",
           dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :passsive_relationships, class_name: "Relationship",
           foreign_key: "followed_id", dependent: :destroy
  has_many :followers, through: :passsive_relationships, source: :follower

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/

  validates :email, presence: true,
            length: {maximum: Settings.user.email_maximum_length},
            format: {with: VALID_EMAIL_REGEX},
            uniqueness: {case_sensitive: false, message: "này đã có người đăng ký, vui lòng chọn email khác"}
  validates :name, presence: true,
            length: {maximum: Settings.user.name_maximum_length}
  validates :password, presence: true,
            length: {minimum: Settings.user.password_minimum_length},
            allow_nil: true

  def as_json(*)
    super.tap do |hash|
      hash["tags"] = user_tags.map {|user_tag| user_tag.tag_id}
      hash["province"] = province
      hash["doctor"] = doctor
      hash["following"] = following.map {|user| user.id}
      hash["followers"] = followers.map {|user| user.id}
    end
  end

  def follow(other_user)
    following << other_user
  end

  def unfollow(other_user)
    following.delete(other_user)
  end

  def following?(other_user)
    following.include?(other_user)
  end
end