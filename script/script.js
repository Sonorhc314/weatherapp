let apiKey = "2069d66bcab3a954960fd755429982a7";

let week = [
    "Sun",
	"Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
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
	let temp_maxV;
	let temp_minV;
	let humidity = document.querySelector("#humidity");
	let wind = document.querySelector("#wind");
	let description = document.querySelector("#description");
	let desc_small = document.querySelector("#desc");
	let menu = document.querySelector("#menu");
    con.innerHTML=`${Math.round(cons)}`;
	let temp_min = document.querySelector("#temp_min");
	let temp_max = document.querySelector("#temp_max");
	let pressure = document.querySelector("#pressure");
	let feels_like = document.querySelector("#feels_like");
	let icon = document.querySelector("#icon");
	
	function formatDay(timestamp)
	{
		let date = new Date(timestamp*1000);
		let day = date.getDay();

		if(day>5)
		{
			day=-1;
		}
		
		return week[day+1];
	}
	function displayForecast(response)
	{
		let forecast = response.data.daily;
		let forecastEl=document.querySelector("#forecast");
		let forecastHTML=`<div class="row">`;
		forecast.forEach(function(forecastDay, index)
		{
			if(index<5)
			{
				forecastHTML=forecastHTML +"<div class=`col-2`>"+
				`	<div class="block2" style="margin:16px">
						<p> ${Math.round(forecastDay.temp.min)}°/${Math.round(forecastDay.temp.max)}°
						</br>${formatDay(forecastDay.dt)}
						<img
						  src="http://openweathermap.org/img/wn/${
							forecastDay.weather[0].icon
						  }@2x.png"
						  alt=""
						  width="42"
						/>
						</p>
					</div>
				</div>
				`;
			}
		});
		forecastHTML = forecastHTML + `</div>`;
		forecastEl.innerHTML = forecastHTML;
	}
	function getForecast(coordinates)
	{
		let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
		axios.get(apiUrl).then(displayForecast);
	}
	
	
	function locator(response)
	{
		//console.log(response.data);
		cons=response.data.main.temp;
		con.innerHTML=`${Math.round(cons)}`;
		h2.innerHTML = `Weather in ${response.data.name}, ${response.data.sys.country}`;
			
		humidity.addEventListener("click", function(event){
			menu.innerHTML = `Humidity is ${response.data.main.humidity}%`;
		});
		wind.addEventListener("click", function(event){
			menu.innerHTML = `Wind is ${Math.round(response.data.wind.speed)}km/h`;
		});
		description.addEventListener("click", function(event){
			menu.innerHTML = `Description: ${response.data.weather[0].description}`;
		});
		desc_small.innerHTML = `${response.data.weather[0].main}`;
		temp_maxV = Math.round(response.data.main.temp_max);
		temp_minV = Math.round(response.data.main.temp_min);
		temp_max.innerHTML = `${Math.round(response.data.main.temp_max)}`;
		temp_min.innerHTML = `${Math.round(response.data.main.temp_min)}`;
		icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
		pressure.addEventListener("click", function(event){
			menu.innerHTML = `Pressure is ${Math.round(response.data.main.pressure)} mbar`;
		});
		feels_like.addEventListener("click", function(event){
			menu.innerHTML = `Feels like ${response.data.main.feels_like}°C`;
		});
		getForecast(response.data.coord);
	}
	
	var apiUrl_def = "https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=".concat(apiKey, "&units=metric");
	axios.get(apiUrl_def).then(locator);
	
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
		temp_max.innerHTML = `${Math.round(celfar(temp_maxV))}`;
		temp_min.innerHTML = `${Math.round(celfar(temp_minV))}`;
        });
    cel.addEventListener("click", function(event){
        con.innerHTML = `${Math.round(cons)}`;
		temp_max.innerHTML = `${Math.round(temp_maxV)}`;
		temp_min.innerHTML = `${Math.round(temp_minV)}`;
        });
	
}

