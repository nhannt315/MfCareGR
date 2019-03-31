Rails.application.routes.draw do
  resources :articles do
    collection do
      get "get_top"
      post "related_articles"
    end
  end
end
