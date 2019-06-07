namespace :user do
  desc "TODO"
  task generate_province_gender: :environment do
    UserProfile.find_each do |user|
      gender_index = rand(3)
      province_offset = rand(Province.count)
      rand_province = Province.offset(province_offset).first
      user.province_id = rand_province.id unless user.province
      user.gender = gender_index unless user.gender
      user.password = "nhan1412"
      user.password_confirmation = "nhan1412"
      unless user.email
        user.email = "#{user.username}@gmail.com"
      end
      if user.save
        puts user.name
      else
        puts user.errors.full_messages
      end
    end
  end

end
