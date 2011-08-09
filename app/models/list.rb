class List < ActiveRecord::Base
  belongs_to :owner
  acts_as_list :scope => :owner
  has_many :tasks, :class_name => 'List', :foreign_key => "parentlist_id", :order => "position"
  belongs_to :parentlist, :class_name => 'List'
end
