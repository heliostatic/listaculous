class List < ActiveRecord::Base
  belongs_to :owner
  acts_as_list :scope => :parentlist
  has_many :tasks, :class_name => 'List', :foreign_key => "parentlist_id", :order => "position"
  belongs_to :parentlist, :class_name => 'List'
  
  def completed?
		self.status == 0
  end
	
  # return an array of parent ids from the first list with parent nil
  def lineage
		parents = []
		list = self
		while list.parentlist_id
			list = List.find(list.parentlist_id)
			parents << list
		end
		parents.reverse!
  end
  
	def children
		children = List.where(:parentlist_id => self.id)
	end

	def has_children?
	  self.children.length > 0
  end
end