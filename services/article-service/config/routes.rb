Rails.application.routes.draw do
  resources :articles do
    collection do
      get "get_top"
      get "get_total"
      post "related_articles"
      get "get_latest_date"
      get "get_recent_crawled"
    end
  end

  get "/get_articles_by_tag_ids", to: "tags#get_article_tags"
end
