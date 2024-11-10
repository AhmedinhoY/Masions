const API_KEY = 'AIzaSyAcf9XrV6fITBDddpEZF9nWxTzDHOZrf8E';
const axios = require('axios');
const HttpError = require('../models/http-error');


async function getCoordsForAddress(address) {

  // Al-hamdulilah
  // we are communicating between 2 api's using axios, very very cool 
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}
  &key=${API_KEY}`);

  const data = response.data;

  if (!data || data.status == 'ZERO_RESULTS') {
    const error = new HttpError(
      'the provided address is incorrect because maps api did not find it',
       422);

    throw error;
  }


  const coordinates = data.results[0].geometry.location; 

  return coordinates;
}

module.exports = getCoordsForAddress;