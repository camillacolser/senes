Rails.application.routes.draw do
  get 'home/index'

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  root 'home#index'

  get 'users/:user_id/fitbit/today' => 'fitbit_api#today'
  get 'users/:user_id/fitbit/week' => 'fitbit_api#week'
  get 'users/:user_id/fitbit/settings' => 'fitbit_api#settings'

  get 'users/:user_id/fitbit/alarms' => 'alarm#index'
  post 'users/:user_id/fitbit/alarms' => 'alarm#create'
  put 'users/:user_id/fitbit/alarms/:id' => 'alarm#update'
  delete 'users/:user_id/fitbit/alarms/:id' => 'alarm#destroy'

  get '/fitbit/subscription' => 'fitbit_api#subscription'
end
