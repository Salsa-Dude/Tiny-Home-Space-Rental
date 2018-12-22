class CreateLeases < ActiveRecord::Migration[5.2]
  def change
    create_table :leases do |t|
      t.datetime :check_in
      t.datetime :checkout_out
      t.text :rules
      t.decimal :total_price
      t.belongs_to :owner, class_name: "User"
      t.belongs_to :renter, class_name: "User"
      t.belongs_to :property
      t.timestamps
    end
  end
end
