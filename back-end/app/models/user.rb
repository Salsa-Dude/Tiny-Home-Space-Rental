class User < ApplicationRecord
  has_secure_password
  has_many :sent_messages, class_name: "Message", foreign_key: "sender_id" 
  has_many :recieved_messages, class_name: "Message", foreign_key: "recipient_id" 
  
  has_many :reviews, class_name: "Review", foreign_key: "reviewer_id"
  has_many :reviews, class_name: "Review", foreign_key: "reviewee_id"

  has_many :properties
  has_many :leases, foreign_key: "owner_id" 
  has_many :rentals, class_name: "Lease", foreign_key: "renter_id"
end
