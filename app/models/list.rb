class List < ActiveRecord::Base
  has_many :tasks
  belongs_to :owner
end
