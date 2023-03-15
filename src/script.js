let tempInCentigrade;

function setApiUrl(city) {
  const apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  return apiUrl;
}

function setDate() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let localDate = new Date();
  let month = months[localDate.getMonth()];
  let date = localDate.getDate();
  let day = days[localDate.getDay()];
  let hour = `0${localDate.getHours()}`.slice(-2);
  let min = `0${localDate.getMinutes()}`.slice(-2);
  let dateStr = `${month} ${date}, ${day} ${hour}:${min}`;
  document.querySelector("#date").textContent = dateStr;
}

function setWeatherAtrr(response) {
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let temp = Math.round(response.data.main.temp);
  tempInCentigrade = temp;
  document.querySelector("#centi").classList.add("active");
  document.querySelector("#faren").classList.remove("active");
  let iconCode = response.data.weather[0].icon;

  document.querySelector("#city").textContent = city;
  document.querySelector("#description").textContent = description;
  document.querySelector("#humidity").textContent = humidity;
  document.querySelector("#wind").textContent = wind;
  document.querySelector("#temp").textContent = temp;
  document
    .querySelector("#temp-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    );
}

function setDafault() {
  setDate();
  axios.get(setApiUrl("isfahan")).then(setWeatherAtrr);
}

setDafault();

function searchProcess(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-city");
  axios.get(setApiUrl(searchBox.value)).then(setWeatherAtrr);
  searchBox.value = null;
  setDate();
}

document.querySelector("form").addEventListener("submit", searchProcess);
document.querySelector("#searchBtn").addEventListener("click", searchProcess);

function toCentigrade(e) {
  e.preventDefault();
  document.querySelector("#centi").classList.add("active");
  document.querySelector("#faren").classList.remove("active");
  document.querySelector("#temp").textContent = tempInCentigrade;
}

function toFahrenheit(e) {
  e.preventDefault();
  document.querySelector("#faren").classList.add("active");
  document.querySelector("#centi").classList.remove("active");
  document.querySelector("#temp").textContent = Math.round(
    (tempInCentigrade * 9) / 5 + 32
  );
}

document.querySelector("#centi").addEventListener("click", toCentigrade);
document.querySelector("#faren").addEventListener("click", toFahrenheit);
