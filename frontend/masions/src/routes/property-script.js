/* eslint-disable no-unused-vars */
import { defer, redirect } from "react-router-dom";
import { getToken } from "../util/getToken";
import { HttpError } from "../util/route-error";

// loads all the properties created by all the users of all types houses, apartements, for rent or for sale
// literally loads everything

export async function loadProperties() {
  const response = await fetch("http://localhost:3000/api/places");

  if (!response.ok) {
    const error = new HttpError("the places could not be fetched", 500, {
      details: "this is the details of the error",
    });
    throw error;
  } else {
    const resData = await response.json();
    return resData.places;
  }
}

export async function loadProperty({ params }) {
  const id = params.id;
  const response = await fetch("http://localhost:3000/api/places/" + id);

  if (!response.ok) {
    const error = new HttpError(
      "the place could not be fetched , error in the EDIT page",
      500,
      { details: "this is the details of the error" }
    );
    throw error;
  } else {
    const resData = await response.json();
    return resData.place;
  }
}

// this function is used for LoadBoth()
export async function property(id) {
  const response = await fetch("http://localhost:3000/api/places/" + id);

  if (!response.ok) {
    const error = new HttpError("the place could not be fetched", 500, {
      details: "this is the details of the error",
    });
    throw error;
  } else {
    const resData = await response.json();
    return resData.place;
  }
}

export async function loadBoth({ params }) {
  const id = params.id;
  return defer({
    property: await property(id),
    properties: await loadProperties(),
  });
}

// we need to watch the react authorization module to see how we can attach the token here
// very nice application and a oppourtiunity of learn ...
export async function deleteProperty({ request, params }) {
  const id = params.id;
  
  // const storedData = getToken();
  // if (!storedData) {
  //   const error = new HttpError(
  //     "unauthorized action, please login or signup",
  //     403,
  //     { details: "this is the details of the error" }
  //   );
  //   throw error;
  // }

  try {
    const response = await fetch("http://localhost:3000/api/places/delete-property" + id, {
      method: request.method,
    });

    if (!response.ok) {
      const error = new HttpError("the place could not be Deleted", 500, {
        details: "this is the details of the error",
      });
      throw error;
    }

  } catch (err) {
    const error = new HttpError("the place could not be Deleted", 500, {
      details: "this is the details of the error",
    });
    throw error;
  }


  return redirect("/");
}
