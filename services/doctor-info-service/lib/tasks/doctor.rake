namespace :doctor do
  desc "TODO"
  task write: :environment do
    arr = []
    Doctor.where.not(user_profile_id: nil).each do |doctor|
      arr.push({doctor_id: doctor.id, user_id: doctor.user_profile_id})
    end
    file = File.open("doctor.json", "w")
    file.write(arr.to_json)
  end

end
