import key from './key.js';
import './main.css';

function fetchWeatherData() {
  fetch('/api/v1/city')
  .then(response => console.log(response))
  .catch(error => console.log(error))
}

console.log(key);

// fetchWeatherData();
