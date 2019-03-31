Rails.application.routes.draw do
  resources :medicine_classes
  resources :medicines do
    member do
      get "same_type"
    end
    collection do
      get "total"
    end
  end
  resources :medicine_types
  resources :diseases do
    collection do
      get "total"
      get "most_viewed"
    end
  end
end
