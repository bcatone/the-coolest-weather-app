class SessionsController < ApplicationController

    def index
        begin
            response = RestClient.get("http://ip-api.com/json/")
        rescue RestClient::NotFound
            puts "No location found."
        else
            hash = JSON.parse(response)
            puts hash
            session[:geolocation] = hash
        end

        geolocation = session[:geolocation]

        puts geolocation

        render json: geolocation, status: :ok
    end

    def create

    end
    
end
