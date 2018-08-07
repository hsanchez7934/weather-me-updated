const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const requireHTTPS = (request, response, next) => {
  if (request.header('x-forwarded-proto') != 'https') {
    return response.redirect(`https://${request.header('host')}${request.url}`);
  }
  return next();
};

if (process.env.NODE_ENV === 'production') {
  app.use(requireHTTPS);
}

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.title = 'Weather Me';

const environment = process.env.NODE_ENV || 'development';

app.get('/', (request, response) => {
  response.send('Hello there')
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
