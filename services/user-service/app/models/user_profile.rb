class UserProfile < ApplicationRecord
  belongs_to :province
  has_secure_password
  validates_presence_of :name, :email, :password_digest
  attr_accessor :doctor
end