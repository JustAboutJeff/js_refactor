class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :initials, :unique => true , :null => false, :limit => 3
      t.timestamps
    end
  end
end
