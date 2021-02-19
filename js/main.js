//Get Elements
const notificationElement = document.querySelector('.notification');
const city = document.querySelector('.city h2');
const temp = document.querySelector('.temp');
const tempIcon = document.querySelector('.tempIcon p');
const cdate = document.querySelector('.date');

const wind = document.querySelector('.wind');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const cloudyness = document.querySelector('.cloudyness');


//Weather Object
const weather = {
    unit: "celsius",
    temperature: {
        value: 0
    },
    kelvin: 273,
    description: "No Forcast",
    iconId: [],
    city: "City",
    country: "Country",
    wind: {
        deg: 0,
        speed: 0
    }
}


//GET API connected
const key = "4c4d9c1e45de412b76cac9bf3ebf8000";



function setPosition(pos){
    const crd = pos.coords;
    getWeather(crd.latitude, crd.longitude)
    console.log(crd.latitude, crd.longitude);
}

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){    
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//GEt Weather Date from API
function getWeather(coLat, coLong){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${coLat}&lon=${coLong}&appid=${key}`;
    console.log(api);

    fetch(api)
        .then(function(response){
            let data = response.json();

            console.log(data);
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - weather.kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.wind.speed = data.wind.speed;
            
        })
        .then(function(){
            displayWeather();
        });



}

// DISPLAY WEATHER 
function displayWeather(){
    //iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    tempIcon.innerHTML = `${weather.temperature.description}`;
    city.innerHTML = `${weather.city}, ${weather.country}`;  

    wind.innerHTML = `Wind: ${weather.wind.speed}`;  
    
   
    
    
    
    
}

