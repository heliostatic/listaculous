module ListsHelper
	def get_list_by_id(id)
		List.find(id)
	end
end
