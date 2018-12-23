
Rails.application.routes.draw do
  # http://localhost:3000/api/v1/login
  namespace :api do
    namespace :v1 do
      resources :users
      resources :properties
      resources :leases
      resources :messages
      resources :reviews

      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
    end
  end
end



