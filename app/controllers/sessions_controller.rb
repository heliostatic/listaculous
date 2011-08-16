class SessionsController < ApplicationController
	def create
   	#raise request.env["omniauth.auth"].to_yaml
		auth = request.env["omniauth.auth"] 
		owner = Owner.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Owner.create_with_omniauth(auth)
		session[:user_id] = owner.id
		redirect_to root_url, :notice => "Signed in!"
	end
	
	def destroy
		session[:user_id] = nil
		redirect_to root_url, :notice => "Signed out!"
	end
end
