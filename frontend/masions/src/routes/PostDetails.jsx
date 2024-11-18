/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Await, useLoaderData, useSubmit } from "react-router-dom";
import Card from "../components/Card/Card";
import PropertiesList from "../components/PropertiesList/PropertiesList";
import { Button } from "../shared/Button";
import { Modal } from "../shared/Modal";
import { Suspense, useContext, useRef } from "react";
import { AuthContext } from "../shared/context/auth-context";

const houses = [
  {
    id: 1,
    img: [
      {
        imgNo: 1,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 2,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 3,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 4,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
    ],
    city: "Manama",
    type: "House",
    bedrooms: 4,
    bathrooms: 4,
    area: 403,
    location: "Block 605, Road 587",
    price: 86500,
    features: ["Garden", "Garage", "Swimming Pool", "Central Heating"],
    description:
      "A spacious 4-bedroom house located in the heart of Manama with modern amenities and close to shopping centers.",
  },
  {
    id: 2,
    img: [
      {
        imgNo: 1,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 2,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 3,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 4,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
    ],
    city: "Sitra",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    area: 333,
    location: "Block 605, Road 587",
    price: 86200,
    features: ["Private Garden", "Balcony", "Solar Panels", "Outdoor Parking"],
    description:
      "A luxurious villa in Sitra with a private garden, ideal for families. Well-connected to local amenities.",
  },
  {
    id: 3,
    img: [
      {
        imgNo: 1,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 2,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 3,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 4,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
    ],
    city: "Muharraq",
    type: "Villa",
    bedrooms: 3,
    bathrooms: 4,
    area: 393,
    location: "Block 605, Road 587",
    price: 88000,
    features: [
      "Gym Room",
      "Home Theater",
      "Security System",
      "Backup Generator",
    ],
    description:
      "Modern 3-bedroom villa with top-notch security and entertainment amenities. Located in a quiet area in Muharraq.",
  },
  {
    id: 4,
    img: [
      {
        imgNo: 1,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 2,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 3,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
      {
        imgNo: 4,
        imgSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
    ],
    city: "Sanabis",
    type: "House",
    bedrooms: 5,
    bathrooms: 5,
    area: 402,
    location: "Block 605, Road 587",
    price: 91000,
    features: ["Rooftop Terrace", "Indoor Pool", "Guest House", "Fireplace"],
    description:
      "An elegant 5-bedroom house in Sanabis with a rooftop terrace and an indoor pool, perfect for luxurious living.",
  },
];

const agents = [
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    agency: "Grnata",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    phoneNumber: 36728829,
  },
];



const DetailofPage = ({ property }) => {
  return (
    <>
      <Suspense fallback={<p> Loading .... </p>}>
        <Await resolve={property}>
          {(chosenHouse) => {
            const Status = chosenHouse.propertyStatus[0].toUpperCase() + chosenHouse.propertyStatus.slice(1);
            const propertyType = chosenHouse.type[0].toUpperCase() + chosenHouse.type.slice(1);

            return (
              <>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                  <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={`http://localhost:3000/${chosenHouse.img[0].imgSrc}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={`http://localhost:3000/${chosenHouse.img[1].imgSrc}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={`http://localhost:3000/${chosenHouse.img[2].imgSrc}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img
                      src={`http://localhost:3000/${chosenHouse.img[3].imgSrc}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="mx-auto max-w-2xl px-4  pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8  lg:pt-16">
                  {/* Post Header */}
                  <div className="lg:col-span-2 lg:pr-8 ">
                    <div className="flex justify-between">
                      <h1 className="sm:text-3xl">{chosenHouse.type == 'house' ? 'Villa' : propertyType} for {Status} in {chosenHouse.city}</h1>
                      <h1 className="sm:text-3xl">{chosenHouse.price} BD</h1>
                    </div>
                    <h3>{chosenHouse.address}</h3>
                  </div>
                </div>



              </>

            );
          }}



        </Await >
      </Suspense >
    </>
  )
}

const SimilarProperties = ({ places }) => {
  return (
    <>
      {/* here add a Suspense */}
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={places}>
          {
            (loadedPlaces) => {
              return (
                <div className="mt-10">
                  <h2 className="">Similar Properties</h2>
                  <div className="mt-4 space-y-6">
                    <PropertiesList propertyType={loadedPlaces} limit={3} />
                  </div>
                </div>
              );
            }
          }

        </Await>
      </Suspense>
    </>

  );

}

export default function PostDetails() {

  const { property, places } = useLoaderData();
  const submit = useSubmit();
  const auth = useContext(AuthContext);
  const modal = useRef();

  return (
    <>
      <div className="">
        <div className="pt-6">
          <DetailofPage property={property} />

          <Suspense fallback={<p> Loading .... </p>}>
            <Await resolve={property}>
              {
                (chosenHouse) => {



                  const onDeleteClicked = () => {
                    modal.current.open();
                  }

                  const deleteConfirmation = () => {
                    submit(null, { method: 'DELETE' });
                    console.log('Deleted!');

                  }
                  return (

                    <>
                      {/* Post info */}
                      <div className="mx-auto max-w-2xl px-4 pb-16 pt-2 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-4">
                        {/* columns */}

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                          {/* Overview */}
                          <div className="">
                            <h3 className="sr-only">Description</h3>

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

                          <div className="mt-10">
                            <h2 className="">Features</h2>

                            <div className="mt-4">
                              <ul role="list" className="list-disc space-y-2 pl-4">
                                {chosenHouse.features.map((feature) => (
                                  <li key={feature}>
                                    <p>{feature}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-10">
                            <h2 className="">Description</h2>

                            <div className="mt-4 space-y-6">
                              <p className=" font-serif">{chosenHouse.description}</p>
                            </div>
                          </div>

                          {/* Modal generation */}
                          <Modal
                            ref={modal}
                            className={' w-1/2 min-h-[15rem] drop-shadow-2xl rounded-md p-8'}
                            title={'Are you Sure? '}
                            titleClass={' font-bold font-serif w-full my-3 '}
                            contentClass={' w-full h-[5rem]  mb-2 flex items-center justify-center '}
                            footerClass={' flex items-center justify-end gap-3'}
                            footer={
                              <>
                                <Button
                                  type={'submit'}
                                > Cancel </Button>
                                <Button
                                  danger
                                  type={'submit'}
                                  onClick={deleteConfirmation}
                                >
                                  Confirm
                                </Button>
                              </>
                            }
                          >
                            <p className=" capitalize font-serif font-semibold">
                              if you confirm the post is <span className=" uppercase text-red-900">deleted </span>forever.
                            </p>

                          </Modal>

                          {/* only displayed if the logged in user == creator of the post */}

                          {auth.isLoggedIn && auth.uid === chosenHouse.creator.id && <div className="  mt-4 flex items-center justify-end gap-6">
                            <Button
                              to={`/${chosenHouse.id}/edit`}

                            >
                              Edit
                            </Button>
                            <Button
                              onClick={onDeleteClicked}
                              danger
                            > Delete
                            </Button>
                          </div>
                          }

                          {/* here similar properties shall be rendered */}
                          <SimilarProperties places={places}/>
                        </div>


                        <div className="lg:row-span-3 lg:mt-0" >
                          <div className="">
                            <Card
                              title={chosenHouse.creator.name}
                              subtitle={agents[0].agency}
                              imageUrl={`http://localhost:3000/${chosenHouse.creator.image}`}
                              buttons={[
                                { label: "Call", onclick: "" },
                                { label: "Message", onclick: "" },
                                { label: "Whatsapp", onclick: "" },
                              ]}
                            />
                          </div>
                        </div>

                      </div>

                      {/* Similar Properties
                      <div className=" bg-yellow-800 px-16 py-5">
                        <SimilarProperties places={places} />
                      </div> */}


                    </>

                  );
                }
              }

            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
}




