class PropertiesSerializer < ActiveModel::Serializer
  attributes :id, :status, :address, :city, :state, :description, :perks, :notes, :price, :user_id
  belongs_to :user
end