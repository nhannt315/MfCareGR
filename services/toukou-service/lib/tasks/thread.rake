namespace :thread do
  desc "TODO"
  task post_count: :environment do
    Toukou.find_each do |thread|
      Toukou.reset_counters(thread.id, :posts)
      puts thread.name
    end
  end
end
