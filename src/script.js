function setApiUrl_(city) {
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
