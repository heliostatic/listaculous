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
		
		if parents.length > 0
  		parents.reverse!.slice(1..-1)
    else
      parents
    end
  end
  
	def children
		children = List.where(:parentlist_id => self.id)
	end

	def has_children?
	  self.children.size > 0
  end
  
  def swap_position(target)
    oldpos = self.position
    self.position = target.position
    target.position = oldpos
  end
  
  def movedown (n)
    n.times do
      self.move_lower
    end
    self.save
  end
  
  def moveup (n)
    n.times do
      self.move_higher
    end
    self.save
  end
  
  def move (delta)
    if delta > 0 then
      self.movedown delta
    else
      self.moveup delta.abs
    end
  end
  
end