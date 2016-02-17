Rails.application.routes.draw do
  get 'home/index'

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'

  get 'fitbit/:resource/:date.json' => 'fitbit_api#data_request'

  get 'fitbit/today' => 'fitbit_api#today'
  get 'fitbit/name' => 'fitbit_api#name'
  get 'fitbit/week' => 'fitbit_api#week'
  get 'fitbit/settings' => 'fitbit_api#settings'

  get 'fitbit/alarms' => 'fitbit_api#alarms'
  get 'fitbit/set_alarm' => 'fitbit_api#set_alarm'
  get 'fitbit/delete_alarm' => 'fitbit_api#delete_alarm'
  get 'fitbit/update_alarm' => 'fitbit_api#update_alarm'

  get '/fitbit/subscription' => 'fitbit_api#subscription'
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
