class PropertySerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :status, :address, :city, :state, :description, :perks, :notes, :price, :user_id, :user_info
  belongs_to :user
  has_many :reviews
  has_many :leases

end
