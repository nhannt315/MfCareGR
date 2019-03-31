#!/usr/bin/env bash
docker exec -t project_article-db_1 pg_dump -t articles -t article_tags -t friendly_id_slugs --data-only -U postgres --column-inserts article-service_development > article.sql
docker exec -t project_disease-medicine-db_1 pg_dump -t diseases -t friendly_id_slugs -t medicine_classes -t medicine_types -t medicines --data-only -U postgres --column-inserts disease-medicine-service_development > disease-medicine.sql
docker exec -t project_doctor-db_1 pg_dump -t degrees -t doctor_degrees -t doctor_languages -t doctor_ranks -t doctor_services -t doctor_specialities -t doctors -t jobs -t languages -t medical_services -t provinces -t ranks -t specialities --data-only -U postgres --column-inserts doctor-service_development > doctor.sql
docker exec -t project_search-db_1 pg_dump -t articles -t diseases -t doctors -t medicine_classes -t medicine_types -t medicines -t pg_search_documents -t posts -t tags --data-only -U postgres --column-inserts search-service_development > search.sql
docker exec -t project_tag-db_1 pg_dump -t tags --data-only -U postgres --column-inserts tag-service_development > tag.sql
docker exec -t project_toukou-db_1 pg_dump -t friendly_id_slugs -t likes -t posts -t toukou_tags -t toukous --data-only -U postgres --column-inserts toukou-service_development > toukou.sql
docker exec -t project_user-db_1 pg_dump -t provinces -t user_profiles --data-only -U postgres --column-inserts user-service_development > user.sql
