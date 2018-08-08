import key from './key.js';
import './main.css';
import axios from 'axios';
import kelvinToFahrenheit from 'kelvin-to-fahrenheit';

$('#submit-button').on('click', fetchWeatherDataOnClick);

function fetchWeatherDataOnClick() {
  const parent = document.getElementById('bottom-main');
  const child = document.getElementById('list-wrapper');
  if (child) {
    parent.removeChild(child);
  }
  const userInput = document.getElementById('user-input').value;
  fetchData(userInput);
  document.getElementById('user-input').value = "";
}

async function fetchData(query) {
  if (!isNaN(parseInt(query))) {
    const byZipCodeUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${query},US&APPID=${key}`;
    const response = await axios.get(byZipCodeUrl);
    const city = response.data.city.name;
    const weatherData = parseData(response.data.list);
    displayData(weatherData, city);
  } else if (isNaN(parseInt(query))) {
    const byCityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${query},us&mode=json&APPID=${key}`;
    const response = await axios.get(byCityUrl);
    const city = response.data.city.name;
    const weatherData = parseData(response.data.list);
    displayData(weatherData, city);
  }
}

function parseData(weatherData) {
  return weatherData.reduce((acc, item) => {
    if (!acc[item.dt_txt.slice(0, 10)]) {
      acc[item.dt_txt.slice(0, 10)] = {};
    } else {
      acc[item.dt_txt.slice(0, 10)][item.dt_txt.slice(11, 19)] = kelvinToFahrenheit(item.main.temp) + ' F';
    }
    return acc;
  }, {});
}

function displayCityName(city) {
  let h1 = document.createElement('h1');
  h1.setAttribute('id', 'city-title');
  h1.textContent = city;
  return h1;
}

function displayData(weatherData, city) {
  const cityNameWrapper = document.getElementById('city-name-wrapper');
  const section = document.getElementById('bottom-main');
  const fragment = document.createDocumentFragment();
  const listWrapper = document.createElement('div');
  const cityName = displayCityName(city);

  listWrapper.setAttribute('id', 'list-wrapper');
  cityNameWrapper.appendChild(cityName);

  for (let day in weatherData) {
    let date = weatherData[day];
    let dateCard = document.createElement('article');
    dateCard.textContent = 'Date: ' + day;
    listWrapper.appendChild(dateCard);
    fragment.appendChild(listWrapper);

    for (let time in date) {
      let timeUL = document.createElement('ul');
      let timeLI = document.createElement('li');
      timeUL.textContent = 'Time: ' + time;
      timeLI.textContent = 'Temp: ' + date[time];
      dateCard.appendChild(timeUL);
      timeUL.appendChild(timeLI);
    }
  }
  section.appendChild(fragment);
}
