class List < ActiveRecord::Base
  belongs_to :owner
  has_many :tasks, :class_name => 'List', :foreign_key => "parentlist_id"
  belongs_to :parentlist, :class_name => 'List'
end
