class LeaseSerializer < ActiveModel::Serializer
  attributes :id, :checkin, :checkout, :owner_id, :renter_id, :property_id
  belongs_to :owner, class_name: "User"
  belongs_to :renter, class_name: "User"
  belongs_to :property
end
