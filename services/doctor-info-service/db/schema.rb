# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_09_023607) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "degrees", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "doctor_degrees", force: :cascade do |t|
    t.bigint "doctor_id"
    t.bigint "degree_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["degree_id"], name: "index_doctor_degrees_on_degree_id"
    t.index ["doctor_id"], name: "index_doctor_degrees_on_doctor_id"
  end

  create_table "doctor_languages", force: :cascade do |t|
    t.bigint "doctor_id"
    t.bigint "language_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["doctor_id"], name: "index_doctor_languages_on_doctor_id"
    t.index ["language_id"], name: "index_doctor_languages_on_language_id"
  end

  create_table "doctor_ranks", force: :cascade do |t|
    t.bigint "doctor_id"
    t.bigint "rank_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["doctor_id"], name: "index_doctor_ranks_on_doctor_id"
    t.index ["rank_id"], name: "index_doctor_ranks_on_rank_id"
  end

  create_table "doctor_services", force: :cascade do |t|
    t.bigint "doctor_id"
    t.bigint "medical_service_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["doctor_id"], name: "index_doctor_services_on_doctor_id"
    t.index ["medical_service_id"], name: "index_doctor_services_on_medical_service_id"
  end

  create_table "doctor_specialities", force: :cascade do |t|
    t.bigint "doctor_id"
    t.bigint "speciality_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["doctor_id"], name: "index_doctor_specialities_on_doctor_id"
    t.index ["speciality_id"], name: "index_doctor_specialities_on_speciality_id"
  end

  create_table "doctors", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.text "info"
    t.string "data_images"
    t.string "positions"
    t.string "experiences"
    t.string "training_process"
    t.string "awards"
    t.integer "user_profile_id"
    t.bigint "job_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "view_count"
    t.bigint "province_id"
    t.boolean "activated", default: false
    t.string "identity_image"
    t.string "license_image"
    t.string "place"
    t.index ["job_id"], name: "index_doctors_on_job_id"
    t.index ["province_id"], name: "index_doctors_on_province_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "languages", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "medical_services", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "provinces", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ranks", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "specialities", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
