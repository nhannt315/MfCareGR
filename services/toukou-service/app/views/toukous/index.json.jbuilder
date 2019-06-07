json.has_more @has_more
json.total @threads.total_count
json.threads @threads do |thread|
  json.id thread.id
  json.slug thread.slug
  json.vicare_id thread.vicare_id
  json.name thread.name
  json.published thread.published
  json.title thread.thread_title
  json.view_count thread.view_count
  json.created_at thread.created_at
  json.updated_at thread.updated_at
  json.tags thread.tags
  json.updated thread.created_at != thread.updated_at
  json.question do
    json.id thread.question.id
    json.hiding_creator thread.question.hiding_creator
    json.assignment thread.question.assignment
    json.body thread.question.body
    json.body_raw thread.question.body_raw
    json.body_search thread.question.body_search
    json.poster_type thread.question.poster_type
    json.created_at thread.question.created_at
    json.updated_at thread.question.updated_at
    json.creator thread.question.author
    json.comment_count thread.question.child_count
    json.likes thread.question.likers
  end
end