/* eslint-disable no-unused-vars */
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import LoadingSpinner from "../shared/UI-Elements/LoadingSpinner";
import PropertiesList from "../components/PropertiesList/PropertiesList";

export const WishList = () => {
  const properties = useLoaderData();

  // Ensure `places` is an array or fallback to an empty array
  const propertyTypes = Array.isArray(properties?.places)
    ? properties.places
    : [];

  return (
    <Suspense fallback={<LoadingSpinner asOverlay />}>
      <Await resolve={properties}>
        {({ places }) => (
          <>
            {(!places || places.length === 0) && (
              <div className="w-full min-h-[100px] flex items-center justify-center">
                <h1 className="capitalize drop-shadow-xl">
                  No items here, please add one
                </h1>
              </div>
            )}

            {places && places.length > 0 && (
              <div className="container">
                <section>
                  <h1 className="container-header">Wishlist</h1>
                  <PropertiesList propertyType={places} />
                </section>
              </div>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
};
