class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.text :review_content
      t.integer :rating
      t.belongs_to :reviewer, class_name: "User"
      t.belongs_to :reviewee, class_name: "User"
      t.integer :property_id
      t.timestamps
    end
  end
end
