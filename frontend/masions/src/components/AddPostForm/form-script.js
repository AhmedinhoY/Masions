/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { json, redirect } from "react-router-dom";


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const features = data.get('features');
  const featuresList = features.split(",").map((feature) => feature.trim());
  const bedrooms = data.get('bedrooms');
  const bathrooms = data.get('bathrooms');
  const area = data.get('area');
  const price = data.get('price');
  const imagecity = data.get('imagecity');
  const image = data.get('image');



  console.log(image);
  console.log(imagecity);




  // const placeData = {
  //   city: data.get('city'),
  //   type: data.get('type'),
  //   propertyStatus: data.get('propertyStatus'),
  //   bedrooms: +bedrooms,
  //   bathrooms: +bathrooms,
  //   area: +area,
  //   price: +price,
  //   features: featuresList,
  //   description: data.get('description'),
  //   address: data.get('address'),
  //   image,
  //   creator: '67281c2dd4ca908fa2120765' // later inject the creator of the logged in user
  // }

  // const formData = new FormData();

  // formData.append('city', data.get('city'));
  // formData.append('type', data.get('type'));
  // formData.append('propertyStatus', data.get('propertyStatus'));
  // formData.append('bedrooms', +bedrooms);
  // formData.append('bathrooms', +bathrooms);
  // formData.append('area', +area);
  // formData.append('price', +price);
  // formData.append('features', featuresList);
  // formData.append('description', data.get('description'));
  // formData.append('address', data.get('address'));
  // formData.append('image', image);
  // formData.append('creator', '67281c2dd4ca908fa2120765');


  // // check for the formData and display a modal for errors
  // let url = 'http://localhost:3000/api/places/';

  // if (method === 'PATCH') {
  //   const placeId = params.id;
  //   url = 'http://localhost:3000/api/places/' + placeId;

  // }

  // // Log each key-value pair in FormData
  // for (let [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }

  // const response = await fetch(url, {
  //   method: method,
  //   body: formData
  // })

  // console.log(response);



  // if (response.status === 422) {
  //   return response;
  // }


  // if (!response.ok) {
  //   const error = await response.json();
  //   console.log(error);
  //   throw json({ message: 'Could not save the Listing' }, { status: 500 });
  // }


  // // if you want to deal with the response data and see what are we recieveing from the backend
  // // this is so cool, now we can deal with the backend much better! 

  // const responseData = await response.json();
  // // console.log(responseData.place);
  // // console.log(responseData.message);



  return redirect('/add-post');


}


