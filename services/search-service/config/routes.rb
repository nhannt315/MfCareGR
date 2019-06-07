Rails.application.routes.draw do
  get "search", to: "search#index"
  get "search_article", to: "search#article"
end
