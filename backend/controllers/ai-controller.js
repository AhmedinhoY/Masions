
const message = require("../models/message");
const { handleError } = require("../util/utils");
const axios = require('axios');


exports.predictPrice = async (req, res, next) => {
  try {
    // get the body items here
    const { new_input } = req.body

    // very cool it is working
    // format that flask expects the data to be in
    data = {
      'new_input': new_input,
    }

    // using axios to send a post request to the predict route inside the Flask api
    const response = await axios.post('http://127.0.0.1:5000/predict', data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // making sure the data is there
    if(!response){
      return handleError('price prediction Failed, please try again', 500, next)
    }

    // sending a response back to the frontend
    res.status(200).json({
      message:'success, we made a prediction',
      prediction: response.data.prediction
    })
  } catch (err) {
    console.log(err);
    return handleError('Price Prediction Failed, please try again', 500, next)
  }
}