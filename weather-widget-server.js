function getWeatherForecast(location) {
    if (location) {
        try {
            var r = new sn_ws.RESTMessageV2();
            r.setEndpoint('https://api.weatherbit.io/v2.0/forecast/daily'); // can be set up in REST messages
            r.setQueryParameter('key', gs.getProperty(weatherbit.api.key)) // included here for demo purpose
            r.setQueryParameter('city', location);


            var response = r.execute();
            var responseBody = response.getBody();
            var httpStatus = response.getStatusCode();
            gs.log("Weather API request sent with status code " + httpStatus)

            var obj = JSON.parse(responseBody);

            if (!obj) {
                return "No weather data could be retrieved for your location";
            }

            var weatherObj = {};
            weatherObj.location = obj.city_name;
            weatherObj.ob_time = obj.data[0].timestamp_utc;
            weatherObj.desc = obj.data[0].weather.description;
            weatherObj.windspd = Math.floor(obj.data[0].wind_spd * 10) / 10;
            weatherObj.temp = obj.data[0].temp;
            weatherObj.precip = Math.floor(obj.data[0].precip * 1000) / 1000;
            weatherObj.icon = obj.data[0].weather.icon;

            // gs.log(weatherObj.location + " has " + weatherObj.desc);
            return weatherObj;

            // end try statement
        } catch (ex) {
            var message = ex.message;
            gs.log(message);
        }

        // if no weather data can be found for location
    } else {
        return "Weather information could not be retrieved. No location defined for currently logged in user.";
    }
}