class Game < ActiveRecord::Base
  has_and_belongs_to_many :players
  validate :player_count, :on => :save

  def player_count
    if self.players < 2 || self.players > 4
      errors.add(:players, "Must have 2, 3, or 4 players to race!")
    end
  end
  
end
