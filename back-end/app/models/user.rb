class User < ApplicationRecord
  has_many :sent_messages, class_name: "message", foreign_key: sender_id #sender
  has_many :recieved_messages, class_name: "message", foreign_key: recipient_id #recipient
  
  has_many :reviews, class_name: "review", foreign_key: reviewer_id
  has_many :reviews, class_name: "review", foreign_key: reviewee_id
  has_many :properties
  has_many :leases, foreign_key: owner_id #owner
  has_many :rentals, class_name: "lease", foreign_key: rental_id #renter
end
