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

ActiveRecord::Schema.define(version: 2019_03_20_170334) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.integer "vicare_id"
    t.text "title"
    t.string "slug"
    t.text "description"
    t.datetime "published_date"
    t.string "author"
    t.string "medium_image"
    t.string "homepage_image"
    t.string "large_image"
    t.string "thumbnail_image"
    t.text "body_html"
    t.text "intro"
    t.index ["title"], name: "index_articles_on_title"
  end

  create_table "diseases", force: :cascade do |t|
    t.string "name"
    t.text "content_html"
    t.string "images"
    t.text "brief"
    t.text "overview"
    t.text "summary"
    t.text "cause"
    t.text "prevent"
    t.text "treatment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.index ["brief"], name: "index_diseases_on_brief"
    t.index ["name"], name: "index_diseases_on_name"
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
    t.integer "job_id"
    t.integer "user_profile_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "medicine_classes", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "medicine_types", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.bigint "medicine_class_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["medicine_class_id"], name: "index_medicine_types_on_medicine_class_id"
  end

  create_table "medicines", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.string "image"
    t.bigint "medicine_type_id"
    t.string "company"
    t.text "overview"
    t.text "instruction"
    t.text "info"
    t.text "warning"
    t.text "contraindication"
    t.text "side_effect"
    t.text "note"
    t.text "overdose"
    t.text "preservation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "interaction"
    t.index ["medicine_type_id"], name: "index_medicines_on_medicine_type_id"
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.bigint "searchable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id"
  end

  create_table "posts", force: :cascade do |t|
    t.integer "vicare_id"
    t.integer "toukou_id"
    t.integer "parent_id"
    t.boolean "hiding_creator"
    t.boolean "is_question"
    t.text "body"
    t.text "body_raw"
    t.text "body_search"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "doctor_id"
    t.integer "user_profile_id"
    t.string "poster_type"
    t.index ["body_raw"], name: "index_posts_on_body_raw"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
