/* eslint-disable no-unused-vars */
import { PlacesList } from "./PlacesList";

import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

// fallback component special to this webPage only

const FallBack = () => {
  return (
    <>
      <div className="flex flex-col w-full min-h-[70vh] text-center justify-center items-center ">
        <h1 className="font-mono font-bold capitalize text-stone-800 text-2xl">
          Loading the Places ...
        </h1>
        <h2 className=" text-xl font-mono ">Please Wait </h2>
      </div>
    </>
  );
};

const Places = () => {
  const EVENTS = [
    {
      id: "p1",
      title: "My house",
      description: " Alhamduililah on his amazing gifts",
      image: "image",
    },
  ];

  // while loading this data
  // display a fallback content, but that's something for later
  // because the defer is deperciated, we need another way
  const { places } = useLoaderData();

  return (
    <>
      {/*  Dealing beautifully with the slow network connections make user experiences much better */}
      <Suspense fallback={<FallBack />}>
        <Await resolve={places}>
          {(loadedPlaces) => {
            console.log(loadedPlaces);

            return (
              <main className="flex flex-col min-h-full px-10 py-8 gap-8">
                <PlacesList places={loadedPlaces} />
              </main>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default Places;

// the model (data structure) of the place :
// - add a price field

// Database:
// add the file upload feature
