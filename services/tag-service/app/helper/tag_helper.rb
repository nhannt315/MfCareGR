module TagHelper
  def find_user_tag results, tag_id
    results.each do |result|
      if result["tag_id"].to_i == tag_id
        return result["user_ids"]
      end
    end
  end

  def find_thread_tag results, tag_id
    results.each do |result|
      if result["tag_id"].to_i == tag_id
        return result["thread_ids"]
      end
    end
  end

  def find_article_tag results, tag_id
    results.each do |result|
      if result["tag_id"].to_i == tag_id
        return result["article_ids"]
      end
    end
  end
end