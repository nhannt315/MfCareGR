class ToukouSerializer < ActiveModel::Serializer
  attributes :id, :name, :published, :last_answered_post_at,
             :thread_title, :view_count, :created_at, :updated_at

  def tags
    tags
  end
end
