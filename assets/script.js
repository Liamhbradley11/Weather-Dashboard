var city = $("#cityInput").val();

$("#submit").on("click", function(){
    city = $("#cityInput").val();
    $("#cityInput").val("");

    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c39f0e681e04bca87bf68b4f1fc255ac" + "&units=imperial",
        type: "GET",
        dataType: "json"

    }).then(function(data){
        console.log(data.wind.speed);

        listCities();
        currentWeather(data);
        weatherForecast(data);
    });
});
    function listCities() {
        var listItem = $("<li>").addClass("list-group-item").text(city);
        $(".list").append(listItem);
}


//CURRENT WEATHER
    function currentWeather(data) {
        var date = new Date();

        $("#currentCity").empty();

        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var city = $("<h4>").addClass("card-title").text(data.name);
        const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString("en-US"));
        var image = $("<img>").attr("src",  "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        var temperature = $("<p>").addClass("card-text current-temp").text(" Temperature: " + data.main.temp + " °F ");
        var humidity = $("<p>").addClass("card-text current-humidity").text(" Humidity: " + data.main.humidity + "%");
        var windSpeed = $("<p>").addClass("card-text current-wind-speed").text(" Wind Speed : " + data.wind.speed + "MPH");
    


//UV INDEX
    (lat = data.coord.lat), (lon = data.coord.lon);

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=c39f0e681e04bca87bf68b4f1fc255ac",
        type: "GET",

    }).then(function(data) {   
        var uvIndex = $("<p>")
        .addClass("card-text current-uv")
        .text(" UV index : " + data.value);

        //append to the page
        city.append(cityDate, image);
        cardBody.append(city, temperature, humidity, windSpeed, uvIndex);
        card.append(cardBody);
        $("#currentCity").append(card);
    });
}
//5 day weather forecast
    function weatherForecast() {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=8eedc46b2ac663b5418793e8f468fa4b" + "&units=imperial",
            method: "GET",
            dataType: "json"
        }).then(function(data) {
            var date = new Date();
            $("#forecast").empty();
    
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    var card = $("<div>").addClass("card col-md-2 ml-4 bg-dark text-white");
                    var cardBody = $("<div>").addClass("card-body p-3 forecastBody");
                    var cityDate = $("<h4>").addClass("card-title").text(moment(data.list[i].dt, "X").format("MMM Do"));
                    var temperature = $("<p>").addClass("card-text forecastTemp").text("Temp: " + data.list[i].main.temp + "°F ");
                    var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + data.list[i].main.humidity + "%");
                    var image = $("<img>").attr("src","https://openweathermap.org/img/w/" + data.list[i].weather[0].icon +".png");
    
                    //append to the page
                    cardBody.append(cityDate, image, temperature, humidity);
                    card.append(cardBody);
                    $("#forecast").append(card);
                }
            }
        });
    }