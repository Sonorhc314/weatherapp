let apiKey = "2069d66bcab3a954960fd755429982a7";

let week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

let now = new Date();

function capF(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function celfar(num) {
  let con = num*(1.8)+32;
  return con;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}


window.onload = function() {
	let h2 = document.querySelector("h2");
    let date = document.querySelector("#date");
    let search = document.querySelector("#search");
	date.innerHTML = ` ${week[now.getDay()]} ${addZero(now.getHours())}:${addZero(now.getMinutes())}`;
    let cel=document.querySelector("#cel");
    let far=document.querySelector("#far");
    let con=document.querySelector("#con");
	let current = document.querySelector("#current");
    let cons = 14;
	let humidity = document.querySelector("#humidity");
	let wind = document.querySelector("#wind");
	let description = document.querySelector("#description");
	let desc_small = document.querySelector("#desc");
	let menu = document.querySelector("#menu");
    con.innerHTML=`${Math.round(cons)}`;
	let temp_min = document.querySelector("#temp_min");
	let temp_max = document.querySelector("#temp_max");
	
    
	function locator(response)
	{
		console.log(response.data);
		cons=response.data.main.temp;
		con.innerHTML=`${Math.round(cons)}`;
		h2.innerHTML = `Weather in ${response.data.name}`;
			
		humidity.addEventListener("click", function(event){
			menu.innerHTML = `Humidity is ${response.data.main.humidity}%`;
		});
		wind.addEventListener("click", function(event){
			menu.innerHTML = `Wind is ${Math.round(response.data.wind.speed)}m/s`;
		});
		description.addEventListener("click", function(event){
			menu.innerHTML = `Description: ${response.data.weather[0].description}`;
		});
		desc_small.innerHTML = `${response.data.weather[0].main}`;
		temp_max.innerHTML = `${Math.round(response.data.main.temp_max)}`;
		temp_min.innerHTML = `${Math.round(response.data.main.temp_min)}`;
	}
	
    search.addEventListener("click", function(event){
        event.preventDefault();
        let city = document.querySelector("#city").value;
		var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(apiKey, "&units=metric");
		axios.get(apiUrl1).then(locator);
	});

	function currentPosition(position) {
		let lat = position.coords.latitude;
		let logt = position.coords.longitude;
		let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${logt}&units=metric&appid=${apiKey}`;
		//api things
		axios.get(apiUrl).then(locator);
	}
	current.addEventListener("click", function(event){
		event.preventDefault();
		navigator.geolocation.getCurrentPosition(currentPosition);
		});
    far.addEventListener("click",function(event){
		con.innerHTML = `${Math.round(celfar(cons))}`;
        });
    cel.addEventListener("click", function(event){
        con.innerHTML = `${Math.round(cons)}`;
        });
}

