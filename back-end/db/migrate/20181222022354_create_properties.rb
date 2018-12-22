class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |t|
      t.column :status, :integer, default: 0
      t.string :address
      t.text :description
      t.text :perks
      t.text :notes
      t.decimal :price
      t.belongs_to :user
      t.belongs_to :property
      t.timestamps
    end
  end
end
