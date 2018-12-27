class AddNameToProperties < ActiveRecord::Migration[5.2]
  def change
    add_column :properties, :name, :string
  end
end
