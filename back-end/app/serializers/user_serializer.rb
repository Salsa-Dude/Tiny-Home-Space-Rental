class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password, :username, :bio
  has_many :reviews, class_name: "Review", foreign_key: "reviewer_id"
  has_many :reviews, class_name: "Review", foreign_key: "reviewee_id"
  has_many :properties
  
end
