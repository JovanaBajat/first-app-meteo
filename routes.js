const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.post('/city', (req, res) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.city}`,
    json: true,
  }, (error, response, body) => {
    const location = body.results[0].geometry.location;

    request({
      url: `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${location.lat},${location.lng}`,
      json: true,
    }, (error, response, body) => {

      let temp = body.currently.temperature;
      temp = Math.round((temp - 32) / 1.8);

      res.render('meteo', {
        temperature: temp
      })

    });
  });
});


module.exports = router;
