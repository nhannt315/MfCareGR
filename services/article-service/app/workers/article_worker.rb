class ArticleWorker
  include Sneakers::Worker
  QUEUE_NAME = :article
  from_queue QUEUE_NAME,
             durable: true,
             ack: true,
             prefetch: 100
  # exchange: "message_event",
  # exchange_type: "topic",
  # routing_key: "message"
  # arguments: { :'x-dead-letter-exchange' => "#{QUEUE_NAME}-retry" }
  def work(message)
    article = Article.new
    tag_list = []
    response = JSON.parse(message)
    article.title = response["title"]
    article.intro = response["intro"]
    article.vicare_id = response["vicare_id"]
    article.body_html = response["body_html"]
    article.published_date = response["published_date"]
    article.medium_image = response["medium_image"]
    article.thumbnail_image = response["thumbnail_image"]
    article.homepage_image = response["homepage_image"]
    if response["tags"]
      tag_list = ArticleTagService.new(response["tags"], "slug").call
    end
    if article.save
      if response["tags"]
        thread_tag_list = tag_list.map {|tag| {article_id: article.id, tag_id: tag["id"]}}
        ArticleTag.create(thread_tag_list)
      end
      puts "Success #{article.title}"
    else
      puts "Failed #{article.title} : #{article.errors.full_messages}"
    end
    ack!
  end
end
