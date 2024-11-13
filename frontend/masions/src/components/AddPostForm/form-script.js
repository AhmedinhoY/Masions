/* eslint-disable no-unused-vars */
import { redirect, json } from "react-router-dom";


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const features = data.get('features');
  const featuresList = features.split(",").map((feature) => feature.trim());
  const bedrooms = data.get('bedrooms');
  const bathrooms = data.get('bathrooms');
  const area = data.get('area');
  const price = data.get('price');


  const placeData = {
    city: data.get('city'),
    type: data.get('type'),
    propertyStatus: data.get('propertyStatus'),
    bedrooms: +bedrooms,
    bathrooms: +bathrooms,
    area: +area,
    price: +price,
    features: featuresList,
    description: data.get('description'),
    address: data.get('address'),
    creator: '67281c2dd4ca908fa2120765' // later inject the creator of the logged in user
  }



  // check for the formData and display a modal for errors
  let url = 'http://localhost:3000/api/places/';

  if (method === 'PATCH') {
    const placeId = params.id;
    url = 'http://localhost:3000/api/places/' + placeId;

  }



  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(placeData)
  })


  if (response.status === 422) {
    return response;
  }


  if (!response.ok) {
    console.log(response)
    throw json({ message: 'Could not save the Listing' }, { status: 500 });
  }


  // if you want to deal with the response data and see what are recieveing from the backend
  // this is so cool, now we can deal with the backend much better! 

  const responseData = await response.json();
  // console.log(responseData.place);
  // console.log(responseData.message);

  console.log(responseData)


  return redirect('/add-post');





}