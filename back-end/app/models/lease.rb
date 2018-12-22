class Lease < ApplicationRecord
  belongs_to :owner, class_name: "User"
  belongs_to :renter, class_name: "User"
  has_many :properties
end
