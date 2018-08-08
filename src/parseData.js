import kelvinToFahrenheit from 'kelvin-to-fahrenheit';

export default function parseData(weatherData) {
  return weatherData.reduce((acc, item) => {
    if (!acc[item.dt_txt.slice(0, 10)]) {
      acc[item.dt_txt.slice(0, 10)] = {};
    } else {
      acc[item.dt_txt.slice(0, 10)][item.dt_txt.slice(11, 19)] = kelvinToFahrenheit(item.main.temp) + ' F';
    }
    return acc;
  }, {});
};
