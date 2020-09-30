// c39f0e681e04bca87bf68b4f1fc255ac

$(document).ready(function() {
$("#submit").on("click", function(){
    var city = $("#cityInput").val();
    
    $("cityInput").val("");

    getWeather(city);
});

function getWeather(city){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c39f0e681e04bca87bf68b4f1fc255ac" + "&units=imperial",
        method: "GET",
        dataType: "jsonp",
        success: function(data){
            console.log(data);
        }
    })
}
   
function showResults(data){
    return "<p>Temperature: "+data.main.temp+" &deg;F</p>"+
}
});
