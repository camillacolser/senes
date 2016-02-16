class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  respond_to :json, :html

  def fitbit_oauth2
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Fitbit") if is_navigational_format?
      redirect_to "?oauth_token=#{@user.fitbit_client.token}&userId=#{@user.fitbit_client.user_id}&id=#{@user.id}"
    else
      session["devise.fitbit_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end
end
