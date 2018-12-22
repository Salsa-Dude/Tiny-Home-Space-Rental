class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |t|
      t.column :status, :integer, default: 0
      t.string :address
      t.string :city
      t.string :state
      t.text :description
      t.text :perks
      t.text :notes
      t.float :price
      t.integer :user_id
      t.timestamps
    end
  end
end
