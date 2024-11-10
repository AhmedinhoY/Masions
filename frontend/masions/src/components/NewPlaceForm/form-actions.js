/* eslint-disable no-unused-vars */

import { redirect } from "react-router-dom";


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const placeData = {
    title: data.get('title'),
    image: data.get('image'),
    description: data.get('description'),
    address: data.get('address'),
    creator: '67281c2dd4ca908fa2120765' // later inject the creator of the logged in user
  }

  // check for the formData and display a modal for errors
  let url = 'http://localhost:3000/api/places';

  if (method === 'PATCH') {
    const placeId = params.placeId;
    url = 'http://localhost:3000/api/places/' + placeId;


  }

  try {

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(placeData)
    })


    // network errors - deal with it with try ... catch
    if (response instanceof TypeError) {
      throw new Response(JSON.stringify({ message: 'Network Error: could not fetch' }), { status: 500 })
    }

    if (response.status === 422) {
      return response;
    }


    if (!response.ok) {
      console.log(response)
      throw new Response({ message: 'Could not save the Listing' }, { status: 500 });
    }


    // if you want to deal with the response data and see what are recieveing from the backend
    // this is so cool, now we can deal with the backend much better! 

        // const responseData = await response.json();
        // console.log(responseData.place);
        // console.log(responseData.message);


    return redirect('/places');

  } catch (error) {
    // handle network errors here
    // we are using a backend that deals with the internet, or it is connected to the internet
    // therefore we need to deal with it in a different way ? 

    throw new Response(JSON.stringify({ message: 'Network Error: could not fetch' }), { status: 500 })
  }



}



// problems to deal with: 

// - the generic error page will not work
//   because of the try ... catch, this skips the blocks of if statments if the backend throws any kind of errors
//   we need to further test how to deal with errors, it mindblowing and cool 