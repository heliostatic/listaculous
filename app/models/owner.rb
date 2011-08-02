class Owner < ActiveRecord::Base
  has_many :lists
end
