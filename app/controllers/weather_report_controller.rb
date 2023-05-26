class WeatherReportController < ApplicationController

    def create
        @latitude = params[:latitude]
        @longitude = params[:longitude]
        begin
            response = RestClient.get("https://api.open-meteo.com/v1/forecast?latitude=#{@latitude}&longitude=#{@longitude}&hourly=temperature_2m,precipitation&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York")
        rescue RestClient::NotFound
            puts "No weather report found."
        else
            hash = JSON.parse(response)
            puts hash
            render json: hash, status: :created
        end
    end

end
