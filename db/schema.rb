# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_06_194835) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "icons", force: :cascade do |t|
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "images", force: :cascade do |t|
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "songs", force: :cascade do |t|
    t.string "embedded_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "weather_data", force: :cascade do |t|
    t.string "weathercode"
    t.string "description"
    t.bigint "image_id", null: false
    t.bigint "icon_id", null: false
    t.bigint "song_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["icon_id"], name: "index_weather_data_on_icon_id"
    t.index ["image_id"], name: "index_weather_data_on_image_id"
    t.index ["song_id"], name: "index_weather_data_on_song_id"
  end

  add_foreign_key "weather_data", "icons"
  add_foreign_key "weather_data", "images"
  add_foreign_key "weather_data", "songs"
end
