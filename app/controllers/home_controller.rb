class HomeController < ApplicationController
  skip_before_action :authenticate_current_user

  def index
  	
  end
end