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

ActiveRecord::Schema.define(version: 2019_04_26_083540) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "provinces", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "relationships", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followed_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followed_id"], name: "index_relationships_on_followed_id"
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true
    t.index ["follower_id"], name: "index_relationships_on_follower_id"
  end

  create_table "user_profiles", force: :cascade do |t|
    t.string "name"
    t.integer "gender"
    t.string "username"
    t.string "password_digest"
    t.boolean "is_staff"
    t.bigint "province_id"
    t.string "full_name"
    t.datetime "dob"
    t.string "address"
    t.string "display_name"
    t.string "avatar"
    t.string "email"
    t.integer "vicare_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "doctor_id"
    t.string "phone"
    t.index ["province_id"], name: "index_user_profiles_on_province_id"
  end

  create_table "user_tags", force: :cascade do |t|
    t.bigint "user_profile_id"
    t.integer "tag_id"
    t.index ["user_profile_id"], name: "index_user_tags_on_user_profile_id"
  end

end
