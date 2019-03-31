module ToukouHelper
  def find_user users, user_id
    result = users.select {|user| user["id"] == user_id}
    result[0]
  end

  def find_tag tags, tag_ids
    tags.select {|tag| tag_ids.include? tag["id"]}
  end

  def pleasant(string, length = 32)
    raise 'Pleasant: Length should be greater than 3' unless length > 3

    truncated_string = string.to_s
    if truncated_string.length > length
      truncated_string = truncated_string[0...(length - 3)]
      truncated_string += '...'
    end

    truncated_string
  end
end