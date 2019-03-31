Rails.application.routes.draw do
  get "/filter_data", to: "common#filter_data"
  resources :specialities
  resources :doctors do
    collection do
      get "total"
      get "get_by_ids"
    end
    member do
      get "get_info"
    end
  end
end
