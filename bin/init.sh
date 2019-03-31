#!/usr/bin/env bash
docker-compose run article-app rails db:create && docker-compose run article-app rails db:migrate && docker-compose run article-app rails db < backup_data/article.sql
docker-compose run disease-medicine-app rails db:create && docker-compose run disease-medicine-app rails db:migrate && docker-compose run disease-medicine-app rails db < backup_data/disease-medicine.sql
docker-compose run doctor-app rails db:create && docker-compose run doctor-app rails db:migrate && docker-compose run doctor-app rails db < backup_data/doctor.sql
docker-compose run search-app rails db:create && docker-compose run search-app rails db:migrate && docker-compose run search-app rails db < backup_data/search.sql
docker-compose run tag-app rails db:create && docker-compose run tag-app rails db:migrate && docker-compose run tag-app rails db < backup_data/tag.sql
docker-compose run toukou-app rails db:create && docker-compose run toukou-app rails db:migrate && docker-compose run toukou-app rails db < backup_data/toukou.sql
docker-compose run user-app rails db:create && docker-compose run user-app rails db:migrate && docker-compose run user-app rails db < backup_data/user.sql
docker-compose run search-app rake elasticsearch:init


