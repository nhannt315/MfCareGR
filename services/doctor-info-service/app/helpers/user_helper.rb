module UserHelper
  def find_user users, user_id
    users.select {|user| user["id"] == user_id}
  end
end