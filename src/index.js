import key from './key.js';
import './main.css';
import axios from 'axios';
import mockData from '../mockData';
import moment from 'moment';
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
    const weatherData = parseData(response.data.list);
    displayData(weatherData);
  } else if (isNaN(parseInt(query))) {
    const byCityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${query},us&mode=json&APPID=${key}`;
    const response = await axios.get(byCityUrl);
    const weatherData = parseData(response.data.list);
    displayData(weatherData);
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

function displayData(weatherData) {
  const section = document.getElementById('bottom-main');
  const fragment = document.createDocumentFragment();
  const listWrapper = document.createElement('div');
  listWrapper.setAttribute('id', 'list-wrapper');

  for (let day in weatherData) {
    let date = weatherData[day];
    let dateCard = document.createElement('article');
    dateCard.textContent = day;
    listWrapper.appendChild(dateCard);
    fragment.appendChild(listWrapper);

    for (let time in date) {
      let timeUL = document.createElement('ul');
      let timeLI = document.createElement('li');
      timeUL.textContent = time;
      timeLI.textContent = date[time];
      dateCard.appendChild(timeUL);
      timeUL.appendChild(timeLI);
    }
  }
  section.appendChild(fragment);
}
