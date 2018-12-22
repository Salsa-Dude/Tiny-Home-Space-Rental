class Message < ApplicationRecord
  enum status: [ :unread, :read ]
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
end
