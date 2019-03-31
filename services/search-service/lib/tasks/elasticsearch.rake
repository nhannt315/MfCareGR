namespace :elasticsearch do
  desc "TODO"
  task init: :environment do
    ElasticsearchDataImporter.import
  end

end
