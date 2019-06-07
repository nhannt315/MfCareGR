Rails.application.routes.draw do
  get "/filter_data", to: "common#filter_data"
  resources :specialities
  resources :doctors do
    collection do
      get "total"
      get "get_by_ids"
      get "admin_doctor_list"
    end
    member do
      get "get_info"
      get "admin_doctor_detail"
      post "approve"
      post "decline"
    end
  end
end
