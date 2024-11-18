
import { defer, json, redirect } from "react-router-dom";




// loads all the properties created by all the users of all types houses, apartements, for rent or for sale 
// literally loads everything

export async function loadPlaces() {
  const response = await fetch('http://localhost:3000/api/places');

  if (!response.ok) {
    throw json({ message: 'The places could not fetched' }, { status: 500 })
  } else {
    const resData = await response.json();
    return resData.places;
  }
}



export async function loadProperty(id) {

  const response = await fetch('http://localhost:3000/api/places/' + id);

  if (!response.ok) {
    throw json({ message: 'The place could not fetched' }, { status: 500 })
  } else {
    const resData = await response.json();
    return resData.place;
  }
}


export async function loadBoth ({params}){
  const id = params.id;
  return defer({
    property: loadProperty(id),
    places: loadPlaces(),
  })

}


export async function deleteProperty({ request, params }) {
  const id = params.id;
  const response = await fetch('http://localhost:3000/api/places/' + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: 'The place could not fetched' }, { status: 500 })
  } 

  return redirect('/');
}

