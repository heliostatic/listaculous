class List < ActiveRecord::Base
  belongs_to :owner
  has_many :tasks
  belongs_to :owner
end
