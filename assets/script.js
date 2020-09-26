$(document).ready(function(){
    var APIkey = "da435f659ec26288eb1c90b766251c6f"
    var latitude =""
    var longitude =""
    j=0
    var k=0
    var listItem=[]

  //display cities previously searched by looping through local storage
    for (i=1;i<localStorage.length+1; i++){
      listItem[i]=localStorage.getItem(i)
      console.log("listitem",listItem[i])
      var history = $("<li>", {id: i+"history"});
     
      $('#search_history').append(history)
      $("#"+i+"history").html(listItem[i])
} 
    //if enter pressed, city weather data function entered
    $('#search').keypress(function (e) {
        var key = e.which;
        if(key == 13){
            var city=$('#search').val()
            k=localStorage.length
            localStorage.setItem(k+1,city)
            
      //API called, with error returning no city found if mis-spelled and empties the divs of previous data. Otherwise the promise returns all data and attaches it to paragraphs
      //on the right hand side of the page   
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+APIkey,
        method: "GET",
        error: function (xhr){
        if(xhr.status !==200) {
          $('#city').html("There is no city found. Please try again.")
          $('#temperature').html("")
          $('#humidity').html("")
          $('#wind_speed').html("")
          return
        }}
      }).then(function(response) {
        console.log(response)
       
        var icon=response.weather[0].icon
        console.log(icon)
          var image='<img src="http://openweathermap.org/img/wn/'+icon +'@2x.png" width="60" height="60" ></img>'
         $('#city').html('<h2>'+ response.name + "("+ moment().format('L')+")"+ image + '</h2>')
         $('#temperature').html("Temperature: " + Math.round(response.main.temp-273.15) +" °C")
        $('#humidity').html("Humidity: " + response.main.humidity+" %")
        $('#wind_speed').html("Wind Speed: " + response.wind.speed + " MPH")
        latitude = response.coord.lat
        longitude = response.coord.lon
        console.log(latitude, longitude)
        
     
      //latitude and longitude stored in the previous API is used to find the UV index.
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude  +"&lon=" + longitude +"&appid=" + APIkey,
        method: "GET",
        error: function (xhr){
          if(xhr.status !==200) {
            $("#UV_index").empty()
      }}}).then(function(response) {
        $('#UV_index').html("UV Index: " + response.value)
      })
    })
    //this searches for the forecast data at 3 pm in the relevant city and displays it in cards. If error returned, cards are emtied of previous data.
    //Icons are searched from the relevant URL, and the icon code found in the API. 
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast/?q=" + city +"&appid="+APIkey,
        method: "GET",
        error: function (xhr){
          if(xhr.status !==200) {
            $("#cards").empty()
      }}}).then(function(response) {
       
        console.log(response.list)
        console.log(moment("2020-09-26 09:00:00").format('HH'))
        var forecastTemp = []
        var forecastHumidity = []
        var forecastDate=[]
        var forecastIcon=[]
        j=0
        for(i=0; i<response.list.length; i++)
        //15 is 3 pm in 24 hour time
         if(moment(response.list[i].dt_txt).format("HH")==="15"){
           console.log(i)
          forecastTemp[j]=Math.round(response.list[i].main.temp-273.15)
          forecastDate[j]=moment(response.list[i].dt_txt).format('DD/MM/YYYY')
          forecastHumidity[j]=response.list[i].main.humidity
          forecastIcon[j]=response.list[i].weather[0].icon
         
          j++
          

         }
        
         $("#cards").empty()
        $('#forecast').html('<h2>'+"5-Day Forecast:"+'</h2>')
        for (i=0; i<5; i++){
        var $div = $("<div>", {id: i, class: "card col-sm-2 blue mr-3",});
        var $insidediv = $("<div>",{id: "insideDiv", class: "card-body"})
        $insidediv.html('<h5 class="card-title">'+ forecastDate[i]+ '</h5>')
        
        var image='<img src="http://openweathermap.org/img/wn/'+forecastIcon[i] +'@2x.png" width="60" height="60" ></img>'
        $insidediv.append('<p class="card-text">'+ image + '<p>')
        $insidediv.append('<p class="card-text">'+ "Temp: " + forecastTemp[i] +" °C" + '<p>')
        $insidediv.append('<p class="card-text">'+ "Humidity: " + forecastHumidity[i] +" %" + '<p>')
        
        $("#cards").append($div);
        $("#"+i).append($insidediv);
        }
      
      
     
      })
      
    


        
      

    }
    })


  




    })
  