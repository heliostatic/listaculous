class List < ActiveRecord::Base
  belongs_to :owner
  has_many :tasks
end
