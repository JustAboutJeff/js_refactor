class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :winner, :limit => 3
      t.integer :duration
      t.timestamps
    end
  end
end
