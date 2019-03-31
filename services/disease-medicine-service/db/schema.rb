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

ActiveRecord::Schema.define(version: 2019_02_28_151202) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "diseases", force: :cascade do |t|
    t.string "name"
    t.text "content_html"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.string "images"
    t.text "brief"
    t.text "overview"
    t.text "summary"
    t.text "cause"
    t.text "prevent"
    t.text "treatment"
    t.integer "view_count", default: 0
  end

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
    t.text "interaction"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["medicine_type_id"], name: "index_medicines_on_medicine_type_id"
  end

end
