class CreateLeases < ActiveRecord::Migration[5.2]
  def change
    create_table :leases do |t|
      t.date :checkin
      t.date :checkout
      t.belongs_to :owner, class_name: "User"
      t.belongs_to :renter, class_name: "User"
      t.integer :property_id
      t.timestamps
    end
  end
end
