/* eslint-disable no-unused-vars */
import { Await, Link, useLoaderData, useSubmit } from "react-router-dom";
import { Suspense, useContext, useRef } from "react";
import Card from "../components/Card/Card";
import PropertiesList from "../components/PropertiesList/PropertiesList";
import { Button } from "../shared/Button";
import LoadingSpinner from "../shared/UI-Elements/LoadingSpinner";
import { AuthContext } from "../shared/context/auth-context";

export default function PostDetails() {
  const { property, properties } = useLoaderData();
  const submit = useSubmit();
  const auth = useContext(AuthContext);
  const modal = useRef();

  const deleteConfirmation = () => {
    const formData = new FormData(); // Empty FormData for delete action
    submit(formData, { method: "DELETE" });
    console.log("Deleted!");
  };

  return (
    <div className="pt-6">
      <Suspense fallback={<LoadingSpinner asOverlay />}>
        <Await resolve={{ property, properties }}>
          {({ property: chosenHouse, properties: loadedProperties }) => {
            if (!chosenHouse) {
              return <p>Property details are unavailable.</p>;
            }

            // Filter out the current property from the similar properties list
            const similarProperties = loadedProperties.filter(
              (p) => chosenHouse.id !== p.id
            );

            return (
              <div>
                {/* Image Gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                  {/* Main image */}
                  <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={
                        chosenHouse.img?.[0]?.imgSrc
                          ? `http://localhost:3000/uploads/images/${chosenHouse.img[0].imgSrc}`
                          : "fallback-image-path"
                      }
                      className="h-full w-full object-cover object-center"
                      alt={`Image of ${chosenHouse.title || "property"}`}
                    />
                  </div>

                  {/* Additional images */}
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    {chosenHouse.img?.slice(1, 3).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg"
                      >
                        <img
                          src={`http://localhost:3000/uploads/images/${image.imgSrc}`}
                          className="h-full w-full object-cover object-center"
                          alt={`Image ${index + 2}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img
                      src={`http://localhost:3000/uploads/images/${chosenHouse.img[3]?.imgSrc}`}
                      className="h-full w-full object-cover object-center"
                      alt="Additional Image"
                    />
                  </div>
                </div>

                {/* Post Header */}
                <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pt-16">
                  <div className="lg:col-span-2 lg:pr-8">
                    <div className="flex justify-between">
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        {chosenHouse.type} for {chosenHouse.status} in{" "}
                        {chosenHouse.city}
                      </h1>
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        {chosenHouse.price} BD
                      </h1>
                    </div>
                    <h3 className="text-lg text-gray-600">
                      {chosenHouse.address}
                    </h3>
                  </div>
                </div>

                <div className="mx-auto max-w-2xl px-4 pb-16 pt-2 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-4">
                  {/* columns */}

                  {/* Col 1 */}
                  <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    {/* Overview */}
                    <div>
                      <ul className="horizontal-list">
                        <li className="list-item">
                          <h2 className="item-heading">Size</h2>
                          <p className="item-text">{chosenHouse.area} sqm</p>
                        </li>
                        <li className="list-item">
                          <h2 className="item-heading">Bedrooms</h2>
                          <p className="item-text"> {chosenHouse.bedrooms}</p>
                        </li>
                        <li className="list-item">
                          <h2 className="item-heading">Bathrooms</h2>
                          <p className="item-text"> {chosenHouse.bathrooms}</p>
                        </li>
                      </ul>
                    </div>

                    {chosenHouse.features.length > 0 && (
                      <div className="mt-6">
                        <h2 className="">Features</h2>
                        <div className="mt-3 ml-3">
                          <ul role="list" className="list-disc space-y-2 pl-4">
                            {chosenHouse.features.map((feature, index) => (
                              <li key={index}>
                                <p>{feature}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {chosenHouse.description && (
                      <div className="mt-6">
                        <h2 className="">Description</h2>

                        <div className="mt-3 ml-3 space-y-6">
                          <p className="">{chosenHouse.description}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <h2 className="">Similar Properties</h2>

                      <div className="mt-3 ml-3 space-y-6">
                        {similarProperties.length > 0 ? (
                          <PropertiesList
                            propertyType={similarProperties}
                            limit={3}
                          />
                        ) : (
                          <p>No similar places exist</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Col2: Agent Card */}
                  <div className="lg:row-span-3 lg:mt-0">
                    {auth.isLoggedIn &&
                      auth.user.id == chosenHouse.creator.id && (
                        <div className="w-[80%] m-auto">
                          <div className=" mb-4 w-full flex items-center justify-around ">
                            <Link
                              to={`/${chosenHouse.id}/edit`}
                              className="secondary-btn"
                            >
                              Edit
                            </Link>
                            <button className="danger-btn"> Delete</button>
                          </div>
                        </div>
                      )}
                    <Card
                      title={chosenHouse.creator.name}
                      subtitle="Grnata"
                      imageUrl={`http://localhost:3000/uploads/images/${chosenHouse.img[0]?.imgSrc}`}
                      buttons={[
                        {
                          label: "Call",
                          onclick: () => alert("Call agent"),
                        },
                        {
                          label: "Message",
                          onclick: () => alert("Message agent"),
                        },
                        {
                          label: "WhatsApp",
                          onclick: () => alert("WhatsApp agent"),
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
