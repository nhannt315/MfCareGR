namespace :user do
  desc "TODO"
  task update: :environment do
    require "json"
    arr = File.read("doctor.json")
    arr = JSON.parse arr
    arr.each do |element|
      user = UserProfile.find_by id: element["user_id"]
      user.update_attributes(doctor_id: element["doctor_id"]) if user
      puts element["doctor_id"]
      user.save if user
      puts "#{user.name}-#{user.id}" if user
    end
  end

end
