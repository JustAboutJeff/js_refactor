class Player < ActiveRecord::Base
  validate :initials, :presence => true, :length => { :minimum => 1 }, :uniqueness => true
  has_and_belongs_to_many :games
end
