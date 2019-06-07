Rails.application.routes.draw do
  post "auth/login", to: "authentication#authenticate"

  post "signup", to: 'users#create'
  post "signup_doctor", to: 'users#create_doctor'
  get "get_user_info", to: 'users#get_user_info'
  resources :users do
    collection do
      get "get_users_by_ids"
      get "get_users"
      post "follow"
      post "unfollow"
    end
  end

  resources :provinces

  put "change_password", to: "users#change_password"

  get "/get_user_by_tags", to: "user_tag#get_user_tag"
  post "/add_user_tag", to: "user_tag#add_tag"
  post "/remove_user_tag", to: "user_tag#remove_tag"
end
