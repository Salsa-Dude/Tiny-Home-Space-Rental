class ReviewsSerializer < ActiveModel::Serializer
  attributes :id, :review_content, :rating, :reviewer_id, :reviewee_id, :property_id
  belongs_to :reviewer, class_name: "User"
  belongs_to :reviewee, class_name: "User"
  belongs_to :property
end
