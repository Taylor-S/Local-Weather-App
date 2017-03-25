// Calling function
$( document ).ready(function() {
    getLocalWeather();

    $('.tempSwitch').on('click', function() {
        var arr = [];
        arr.push(parseInt($('.tempChange1')[0].innerText), parseInt($('.tempChange2')[0].innerText), parseInt($('.tempChange3')[0].innerText))
        celFarChange(arr);
    });
});




// defining variables
var long, lat;

// function to be called
function getLocalWeather(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position){
            long = position.coords.longitude;
            lat = position.coords.latitude;

            weatherRequest();
        });
    }
}

// Ajax api request and display
function weatherRequest() {
    var location = $('#location'),
    weatherdes = $('#weatherDes'),
    weather = $('#weather'),
    currentTemp = $('#currentTemp'),
    minTemp = $('#minTemp'),
    maxTemp = $('#maxTemp'),
    windSpeed = $('#windSpeed'),
    windDir = $('#windDir')
    outside = $('.outside'),
    humidity = $('#humidity');
    $.ajax({
        type: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather?',
        data: {
            APPID: 'c34f245d0ab31ded7164acfac9ac691a',
            lat: lat,
            lon: long,
            units: 'metric',

        },
        success: function (data) {
                    // backgroundImage
            outside.css('background-image', outsideWeather(data.weather[0].main));

                    // Location Data
            location.html('<span>Location: </span>'  + data.name + ', ' + data.sys.country);

                // Weather Data
            weather.html('<span>Weather: </span>' + data.weather[0].main);

            weatherdes.html('<span>Description: </span>'  +data.weather[0].description);

                // Temperatur datae
            currentTemp.html('<span>Current Temperature: </span>'  + '<span class="tempChange1">' +Math.round(data.main.temp)+ '</span>' + ' ° <span class = "degrees">C</span>');

            minTemp.html('<span>Minimum Temperature: </span>'  + '<span class="tempChange2">' +Math.round(data.main.temp_min)+ '</span>' + ' ° <span class = "degrees">C</span>');

            maxTemp.html('<span>Maximum Temperature: </span>'  + '<span class="tempChange3">' +Math.round(data.main.temp_max)+ '</span>' + ' ° <span class = "degrees">C</span>');


                // Wind Data
            windSpeed.html('<span>Wind Speed: </span>'  +data.wind.speed+ 'm/s');

            windDir.html('<span>Wind Direction: </span>' +windDirection(data.wind.deg)),


                // Humidity data
            humidity.html('<span>Humidity: ' + data.main.humidity + '%');
        }
    });
}




// defining wind direction
function windDirection (data) {
    // wind direction conditionals
    if(data >= 0 && data <= 11.25) {
        return 'N';
    }
    else if (data <= 33.75) {
        return 'NNE';
    }
    else if  (data <= 56.25) {
        return 'NE';
    }
    else if(data <= 78.75) {
        return 'ENE';
    }
    else if  (data <= 101.25) {
        return 'E';
    }
    else if (data <= 123.75) {
        return 'ESE';
    }
    else if (data <= 146.25) {
        return 'SE';
    }
    else if (data <= 168.75) {
        return 'SSE';
    }
    else if (data <= 191.25) {
        return 'S';
    }
    else if (data <= 213.75) {
        return 'SSW';
    }
    else if ( data <= 236.25) {
        return 'SW';
    }
    else if (data <= 258.75) {
        return 'WSW';
    }
    else if (data <= 281.25) {
        return 'W';
    }
    else if (data <= 303.75) {
        return 'WNW';
    }
    else if (data <= 326.25) {
        return 'NW';
    }
    else if (data <= 348.75) {
        return 'NNW';
    }
    else {
        return 'N'
    }
}


// Show the current weather conditions outside the window
function outsideWeather (weather) {
    if (weather === 'Thunderstorm' || weather === 'Extreme'){
        return "url('../images/tornado.gif')";
    }
    else if (weather === 'Rain' || weather === 'Drizzle') {
        return "url('../images/rain.gif')";
    }
    else if (weather === 'Snow') {
        return "url('../images/snowing.gif')";
    }
    else if (weather === 'Clear') {
        return "url('../images/clearSunny.gif')";
    }
    else {
        return "url('../images/cloudy.gif')";
    }

}


// toggle between celsius and fahrenheit
function celFarChange(arr){
    var degrees = $('.degrees'),
     x = 1;
    if (degrees[0].innerText == 'C'){
        // for each value in array, convert to celsius and push to html
        for (var i = 0; i < arr.length; i++) {
            $('.tempChange'+x).html(Math.round( arr[i] * 1.8 + 32 ));
            x++;
        }
        degrees.html('F');
    }
    else{
        // for each value in array, convert to fahrenheit and push to html
        for (var i = 0; i < arr.length; i++) {
            $('.tempChange'+x).html(Math.round( (arr[i] - 32) / 1.8 ));
            x++;
        }
        degrees.html('C');
    }

}
