class CreateWeatherData < ActiveRecord::Migration[7.0]
  def change
    create_table :weather_data do |t|
      t.string :weathercode
      t.string :description
      t.belongs_to :image, null: false, foreign_key: true
      t.belongs_to :icon, null: false, foreign_key: true
      t.belongs_to :song, null: false, foreign_key: true

      t.timestamps
    end
  end
end
