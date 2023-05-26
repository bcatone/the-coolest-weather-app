class WeatherDatum < ApplicationRecord
  belongs_to :image_id
  belongs_to :icon_id
  belongs_to :songs_id
end
