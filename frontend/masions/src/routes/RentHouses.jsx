/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import PropertiesList from "../components/PropertiesList/PropertiesList";

const HousesForRent = [
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
    city: "Muharraq ",
    type: "Villa",
    bedrooms: 3,
    bathrooms: 4,
    area: 393,
    location: "Block 605, Road 587",
    price: 88000,
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
  },
];

export const RentHouses = () => {

  const properties = useLoaderData();
  const propertyHoueses_rent = properties.filter((property) => {
    return (property.type == 'house' && property.propertyStatus == 'rent')
  });

  return (
    <>
      {propertyHoueses_rent.length === 0 && (
        <main className=" w-full min-h-[70vh]  flex items-center justify-center">
          <h1
            className="font-serif font-bold capitalize text-[5vh] drop-shadow-xl "
          > no items here please add one</h1>
        </main>
      )}


      {propertyHoueses_rent.length > 0 && (

        <div className="container">
          <section>
            <h1 className="container-header">Houses For Rent</h1>
            <PropertiesList propertyType={propertyHoueses_rent} />
          </section>
        </div>
      )}

    </>
  );
};
