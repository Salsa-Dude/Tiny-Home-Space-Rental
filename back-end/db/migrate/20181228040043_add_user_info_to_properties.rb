class AddUserInfoToProperties < ActiveRecord::Migration[5.2]
  def change
    add_column :properties, :user_info, :string
  end
end
