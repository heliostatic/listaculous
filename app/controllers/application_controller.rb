class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :require_login
  helper_method :current_user
  
  private 
  
  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to signin_path 
    end 
  end
  
  def logged_in?
    !!current_user
  end
  
  private
  
  def current_user
	  @current_user ||= Owner.find(session[:user_id]) if session[:user_id]
  end
end
