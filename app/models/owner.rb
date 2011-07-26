class Owner < ActiveRecord::Base
  has_many :tasks
end
