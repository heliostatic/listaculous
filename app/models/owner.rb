class Owner < ActiveRecord::Base
  has_many :lists
  after_create :create_base_list
  
  def create_base_list() 
    l = List.create(owner_id: self.id)
  end
  
  def self.create_with_omniauth(auth)
	  create! do |owner|
		  owner.provider = auth["provider"]
		  owner.uid = auth["uid"]
		  owner.name = auth["info"]["name"]
		end
  end
  
end
