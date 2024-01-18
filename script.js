// Coded By LegitCoder:)

// Button
let yourWeatherBtn = document.querySelector(".btn-1");
let searchWeatherBtn = document.querySelector(".btn-2");


// Pages
let grantAccessTab = document.querySelector(".grantAccess");
let weatherInfoTab = document.querySelector(".weather");
let searchWeatherTab = document.querySelector(".searchWeather");
let loader = document.querySelector(".loader");

// Values
let cityName = document.querySelector(".cityUpdate");
let countryIcon = document.querySelector(".countryIcon");
let weatherType = document.querySelector(".weatherType");
let tempType = document.querySelector(".temp-type");
let temperature = document.querySelector(".temp");
let windspeedValue = document.querySelector(".windspeedValue");
let humidityValue = document.querySelector(".humidityValue");
let cloudValue = document.querySelector(".cloudValue");
let citySearch = document.querySelector("#citySubmit");
let searchNew = document.querySelector(".searchnew");
// current Tab
let currentTab = yourWeatherBtn;
currentTab.classList.add("tabprop");
const API_KEY = "64265c78637734db925d495c9ecec510";
// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

// current Page
let currentActive = grantAccessTab;
currentActive.classList.remove("active");

// Variables
let lat = null;
let long = null;
let grantPermisssion = false;
let cityname;
let countryflag;
let weathertypename;
let tempimage;
let temp;
let wind;
let humidity;
let cloud;
let data;
let getValues = false;
let searchcity;

// Functions

//show Loader

function showLoader(){
    currentActive.classList.add("active");
    currentActive = loader;
    currentActive.classList.remove("active");
}

// grant permission button action
function permissiongrant() {
    showLoader();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async function (position) {
                // User has granted location access
                lat = position.coords.latitude;
                long = position.coords.longitude;
                grantPermisssion = true;
                if (grantPermisssion === true) {
                    try {
                        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
                        }
                        data = await response.json();
                        cityname = `${data?.name}`;
                        countryflag = `${data?.sys?.country}`;
                        weathertypename = `${data?.weather[0]?.main}`;
                        tempimage = `${data?.weather[0]?.icon}`;
                        temp = `${(data?.main?.temp - 273.15).toFixed(2)} °C`;
                        wind = `${data?.wind?.speed} m/s`;
                        humidity = `${data?.main?.humidity}`;
                        cloud = `${data?.weather[0]?.description}`;
                        cityName.innerHTML = cityname;
                        countryIcon.src = `https://flagcdn.com/144x108/${countryflag.toLowerCase()}.png`;
                        weatherType.innerHTML = weathertypename;
                        tempType.src = `http://openweathermap.org/img/w/${tempimage.toLowerCase()}.png`;
                        temperature.innerHTML = temp;
                        windspeedValue.innerHTML = wind;
                        humidityValue.innerHTML = humidity;
                        cloudValue.innerHTML = cloud;
                        getValues = true;
                        if(getValues==true){
                            currentActive.classList.add("active");
                            currentActive = weatherInfoTab;
                            currentActive.classList.remove("active");
                            }
                    } catch (error) {
                        console.error("Error fetching weather data:", error.message);
                    }
                } else {
                    currentActive.classList.add("active");
                    currentActive = grantAccessTab;
                    currentActive.classList.remove("active");
                }

            },
            function (error) {
                // Handle error or denial of location access
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.error("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        console.error("The request to get user location timed out.");
                        break;
                    default:
                        console.error("An unknown error occurred.");
                        break;
                }
            }
        );
    } else {
        // Geolocation is not supported by the browser
        console.error("Geolocation is not supported by this browser.");
        currentActive.classList.add("active");
        currentActive = grantAccessTab;
        currentActive.classList.remove("active");
    }

}

// Your Weather App tab Function
async function yourweatherBtnfunc() {
    // tab background
    currentTab.classList.remove("tabprop");
    currentTab = yourWeatherBtn;
    currentTab.classList.add("tabprop");
    showLoader();
    if (getValues === true) {
        currentActive.classList.add("active");
        currentActive = weatherInfoTab;
        currentActive.classList.remove("active");
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data: ${response.statusText}`);
            }
            data = await response.json();
            cityname = `${data?.name}`;
            countryflag = `${data?.sys?.country}`;
            weathertypename = `${data?.weather[0]?.main}`;
            tempimage = `${data?.weather[0]?.icon}`;
            temp = `${(data?.main?.temp - 273.15).toFixed(2)} °C`;
            wind = `${data?.wind?.speed} m/s`;
            humidity = `${data?.main?.humidity}`;
            cloud = `${data?.weather[0]?.description}`;
            cityName.innerHTML = cityname;
            countryIcon.src = `https://flagcdn.com/144x108/${countryflag.toLowerCase()}.png`;
            weatherType.innerHTML = weathertypename;
            tempType.src = `http://openweathermap.org/img/w/${tempimage.toLowerCase()}.png`;
            temperature.innerHTML = temp;
            windspeedValue.innerHTML = wind;
            humidityValue.innerHTML = humidity;
            cloudValue.innerHTML = cloud;
        } catch (error) {
            console.error("Error fetching weather data:", error.message);
        }
    } else {
        currentActive.classList.add("active");
        currentActive = grantAccessTab;
        currentActive.classList.remove("active");
    }
}

// Search Weather For Places Function
function searchweatherBtnfunc() {

    // tab background
    currentTab.classList.remove("tabprop");
    currentTab = searchWeatherBtn;
    currentTab.classList.add("tabprop");


    // current tab
    currentActive.classList.add("active");
    currentActive = searchWeatherTab;
    currentActive.classList.remove("active");

    // search click function
}

async function searchweatherinfo(){
    showLoader();
    searchcity = citySearch.value;
    citySearch.value = '';
    let valueget = false;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }
        data = await response.json();
        cityname = `${data?.name}`;
        countryflag = `${data?.sys?.country}`;
        weathertypename = `${data?.weather[0]?.main}`;
        tempimage = `${data?.weather[0]?.icon}`;
        temp = `${(data?.main?.temp - 273.15).toFixed(2)} °C`;
        wind = `${data?.wind?.speed} m/s`;
        humidity = `${data?.main?.humidity}`;
        cloud = `${data?.weather[0]?.description}`;
        cityName.innerHTML = cityname;
        countryIcon.src = `https://flagcdn.com/144x108/${countryflag.toLowerCase()}.png`;
        weatherType.innerHTML = weathertypename;
        tempType.src = `http://openweathermap.org/img/w/${tempimage.toLowerCase()}.png`;
        temperature.innerHTML = temp;
        windspeedValue.innerHTML = wind;
        humidityValue.innerHTML = humidity;
        cloudValue.innerHTML = cloud;
        valueget = true;
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
    if(valueget==true){
        currentActive.classList.add("active");
        currentActive = weatherInfoTab;
        currentActive.classList.remove("active");
    }
    else{
        console.log("no");
    }
}



