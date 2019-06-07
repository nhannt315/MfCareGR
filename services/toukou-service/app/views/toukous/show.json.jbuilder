json.id @thread.id
json.vicare_id @thread.vicare_id
json.slug @thread.slug
json.name @thread.name
json.published @thread.published
json.title @thread.thread_title
json.view_count @thread.view_count
json.created_at @thread.created_at
json.updated_at @thread.updated_at
json.tags @thread.tags
json.question do
  json.id @post.id
  json.hiding_creator @post.hiding_creator
  json.assignment @post.assignment
  json.body @post.body
  json.body_raw @post.body_raw
  json.body_search @post.body_search
  json.poster_type @post.poster_type
  json.created_at @post.created_at
  json.updated_at @post.updated_at
  json.creator @post.author
  json.likes @post.likers
  json.childrens @post.children do |child|
    json.id child.id
    json.hiding_creator child.hiding_creator
    json.body child.body
    json.body_raw child.body_raw
    json.body_search child.body_search
    json.poster_type child.poster_type
    json.created_at child.created_at
    json.updated_at child.updated_at
    json.author child.author
    json.likes child.likers
  end
end