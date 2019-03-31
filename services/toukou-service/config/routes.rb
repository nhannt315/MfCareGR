Rails.application.routes.draw do
  post "tag/", to: "tags#add_remove_tag"
  resources :posts
  resources :like
  resources :toukous do
    member do
      get "get_comment_detail"
    end
  end

end
