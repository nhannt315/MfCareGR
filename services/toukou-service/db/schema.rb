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

ActiveRecord::Schema.define(version: 2019_04_15_031011) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friendly_id_slugs", id: :serial, force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "post_id"
    t.integer "user_profile_id"
    t.index ["post_id"], name: "index_likes_on_post_id"
    t.index ["user_profile_id"], name: "index_likes_on_user_profile_id"
  end

  create_table "posts", force: :cascade do |t|
    t.integer "vicare_id"
    t.bigint "toukou_id"
    t.integer "parent_id"
    t.boolean "hiding_creator"
    t.boolean "is_question"
    t.text "body"
    t.text "body_raw"
    t.text "body_search"
    t.integer "doctor_id"
    t.integer "user_profile_id"
    t.string "poster_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_id"], name: "index_posts_on_parent_id"
    t.index ["toukou_id"], name: "index_posts_on_toukou_id"
  end

  create_table "toukou_tags", force: :cascade do |t|
    t.integer "tag_id"
    t.bigint "toukou_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["toukou_id"], name: "index_toukou_tags_on_toukou_id"
  end

  create_table "toukous", force: :cascade do |t|
    t.integer "vicare_id"
    t.text "name"
    t.boolean "published"
    t.datetime "last_answered_post_at"
    t.string "thread_title"
    t.integer "view_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.integer "posts_count", default: 0
    t.index ["slug"], name: "index_toukous_on_slug", unique: true
  end

end
