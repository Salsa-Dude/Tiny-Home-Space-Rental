class Property < ApplicationRecord
  enum status: [ :available, :booked ]
  belongs_to :user
  has_many :leases
  has_many :reviews
end
