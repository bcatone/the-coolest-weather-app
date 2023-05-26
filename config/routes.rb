Rails.application.routes.draw do
  resources :weather_data
  resources :songs
  resources :icons
  resources :images

  # Geolocation
  get '/geolocation', to: 'sessions#index'
  post '/weather_report', to: 'weather_report#create'
   
end
