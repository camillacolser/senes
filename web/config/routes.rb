Rails.application.routes.draw do
  get 'home/index'

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'

  get 'fitbit/:resource/:date.json' => 'fitbit_api#data_request'
  get 'fitbit/heart' => 'fitbit_api#heart'
  get 'fitbit/sleep' => 'fitbit_api#sleep'
  get 'fitbit/steps' => 'fitbit_api#steps'
  get 'fitbit/battery' => 'fitbit_api#battery'
  get 'fitbit/last_sync_time' => 'fitbit_api#last_sync_time'
  get 'fitbit/sedentary' => 'fitbit_api#sedentary'
  get 'fitbit/lightly_active' => 'fitbit_api#lightly_active'
  get 'fitbit/very_active' => 'fitbit_api#very_active'
  get 'fitbit/fairly_active' => 'fitbit_api#fairly_active'
  get 'fitbit/today' => 'fitbit_api#today'
  get 'fitbit/tracker_id' => 'fitbit_api#tracker_id'
  get 'fitbit/set_alarm' => 'fitbit_api#set_alarm'
  get 'fitbit/alarms' => 'fitbit_api#alarms'
  get 'fitbit/name' => 'fitbit_api#name'
  get 'fitbit/week' => 'fitbit_api#week'

  post '/fitbit/subscription' => 'fitbit_api#subscription'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
