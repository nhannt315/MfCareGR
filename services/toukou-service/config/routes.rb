Rails.application.routes.draw do
  post "tag/", to: "tags#add_remove_tag"
  get "get_thread_by_tag_ids/", to: "tags#get_toukou_tags"
  resources :posts do
    collection do
      get "get_total"
    end
  end
  resources :like
  resources :toukous do
    member do
      get "get_comment_detail"
    end
  end

end
