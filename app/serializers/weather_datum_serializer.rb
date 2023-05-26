class WeatherDatumSerializer < ActiveModel::Serializer
  attributes :id, :weathercode, :description
  has_one :image_id
  has_one :icon_id
  has_one :songs_id
end
