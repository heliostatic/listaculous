class List < ActiveRecord::Base
  belongs_to :owner
  acts_as_list :scope => :parentlist
  has_many :tasks, :class_name => 'List', :foreign_key => "parentlist_id", :order => "position"
  belongs_to :parentlist, :class_name => 'List'
  
  def completed?
		self.status == 0
  end
end