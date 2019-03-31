Rails.application.routes.draw do
  post "auth/login", to: "authentication#authenticate"

  post "signup", to: 'users#create'
  get "get_user_info", to: 'users#get_user_info'
  resources :users do
    collection do
      get "get_users_by_ids"
    end
  end
end
