Rails.application.routes.draw do
  
  devise_for :users
  resources :messages
  resources :conversations

  namespace :api do 
    namespace :v1 do 
      resources :users, only: [:index, :show, :edit, :update]
      resources :messages
      resources :conversations, only: [:index, :show]
    end
  end

end
