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

var choice = prompt("Enter a city: ");
var flag = false;

if (choice)
{
  choice = choice.toLowerCase();
  for (const key in weather) {
    if (key === choice) {
      flag = true;
      alert(
        `It is currently ${Math.round(weather[`${key}`].temp)}°(${Math.round(
          weather[`${key}`].temp * 1.8 + 32
        )}°F) in ${choice} with a humidity of ${weather[`${key}`].humidity}%`
      );
      break;
    }
  }
  if (flag === false) 
  {
    alert(`
      Sorry, we don't know the weather for this city,
      try going to https://www.google.com/search?q=weather+${choice}`);
  }
}
