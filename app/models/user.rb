class User < ApplicationRecord

  has_many :messages
  has_many :members
  has_many :groups, through: :members

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
