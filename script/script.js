let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};

let week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

var flag = false;
let now = new Date();

function capF(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function celfar(num) {
  let con = num*(1.8)+32;
  return con;
}

function farcel(num) {
  let con = num/(1.8)-32;
  return con;
}

window.onload = function() {
    let h2 = document.querySelector("h2");
    let date = document.querySelector("#date");
    let search = document.querySelector("#search");
    date.innerHTML =` ${week[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`
    search.addEventListener("click", function(event){
        event.preventDefault();
        let city = document.querySelector("#city");
        let choice = city.value.toLowerCase();
         for (const key in weather) {
            if (key === choice) {
              flag = true;
              h2.innerHTML =`Weather in ${capF(choice)}`;
              break;
            }
          }
          if (flag === false) 
          {
            alert(
              `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${choice}`);
          }
        });
    let cel=document.querySelector("#cel");
    let far=document.querySelector("#far");
    let con=document.querySelector("#con");
    let cons = 14;
    con.innerHTML=`${cons}`;
    far.addEventListener("click",function(event){
        con.innerHTML = `${celfar(cons)}`;
        });
    cel.addEventListener("click", function(event){
        con.innerHTML = `${cons}`;
        });
}

