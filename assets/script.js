$(document).ready(function(){
    var APIkey = "da435f659ec26288eb1c90b766251c6f"
    
    
    $('#search').keypress(function (e) {
        var key = e.which;
        if(key == 13){
            var city=$('#search').val()
            var lat=33.44
            var lon=-94.04
        
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+ "&lon=" +lon+"&exclude=hourly,minutely&appid="+APIkey,
        method: "GET"
      }).then(function(response, xhr) {
        // $('#city').html(response.name + "("+ moment().format('L')+")")
        // $('#temperature').html("Temperature: " + Math.round(response.main.temp-273.15) +" C")
        // $('#humidity').html("Humidity: " + response.main.humidity+" %")
        // $('#wind_speed').html("Wind Speed: " + response.wind.speed + " MPH")



        console.log(response)
        
      })







        
      }


    })


    




    })
