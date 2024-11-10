

// this loader function is in here to make react work as fast as possible
// Fast refresh only works when a file only exports components.

// defer here is used to display a fallback content if connection is slow 
// defer is avaliable in version 6.4 ~ 6.27 so make sure you download an exact version of this

import { defer, redirect } from "react-router-dom";

export async function loadPlaces() {
  const response = await fetch('http://localhost:3000/api/places');

  if (!response.ok) {
    throw new Response({ message: 'The places could not be fetched' }, { status: 500 });

  }

  else {
    const resData = await response.json();
    return resData.places;
  }
}

// places loader
export async function loader(){
  return defer({
    places: loadPlaces()
  });
}





// loader function for the place detail component

export async function loadPlace({ params }) {
  const id = params.placeId;
  const response = await fetch('http://localhost:3000/api/places/' + id);

  if (!response.ok) {
    throw new Response({ message: 'the place could not be fetched' }, { status: 500 });
  }

  else {
    const resData = await response.json();
    return resData.place;
  }


}


export async function deletePlaceAction({ request, params }) {
  const id = params.placeId;
  const response = await fetch('http://localhost:3000/api/places/' + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'could not delete the place' }), { status: 500 });
  }

  return redirect('/places');


}