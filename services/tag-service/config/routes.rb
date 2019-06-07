Rails.application.routes.draw do
  resources :tags do
    collection do
      get "get_tags_by_ids"
      get "get_tags_by_slugs"
    end
  end
  get "search_tag/", to: "tags#search_tag"
end
