class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # >>>>>> TO PROCTECT US FROM HACKERS >>>> protect_from_forgery with: :exception
  # def after_sign_in_path_for(resource)
  #   redirect_to 'https://www.google.co.uk/imghp?gws_rd=ssl'
  # end
end
