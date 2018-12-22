class Property < ApplicationRecord
  belongs_to :user
  belongs_to :lease
  has_many :reviews
end
