class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :subject
      t.text :content
      t.column :status, :integer, default: 0
      t.belongs_to :sender, class_name: "User"
      t.belongs_to :recipient, class_name: "User"
      t.timestamps
    end
  end
end
