json.array! @users do |user|
  json.id user.id
  json.name user.name
  json.gender user.gender
  json.province user.province
  json.full_name user.full_name
  json.dob user.dob
  json.address user.address
  json.display_name user.display_name
  json.avatar user.avatar
  json.email user.email
  json.doctor user.doctor
end