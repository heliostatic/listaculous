class Owner < ActiveRecord::Base
  has_many :lists
  
  def self.create_with_omniauth(auth)
	  create! do |owner|
		  owner.provider = auth["provider"]
		  owner.uid = auth["uid"]
		  owner.name = auth["info"]["name"]
		end
  end
  
end
