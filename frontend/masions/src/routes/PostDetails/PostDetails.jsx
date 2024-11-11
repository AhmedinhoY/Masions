import styles from "./PostDetails.module.css";
import classNames from "classnames";
import Card from "../../components/Card/Card";

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

export default function Example() {
  return (
    <div className="">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={houses[0].img[0].imgSrc}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={houses[0].img[1].imgSrc}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={houses[0].img[2].imgSrc}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={houses[0].img[3].imgSrc}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4  pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8  lg:pt-16">
          {/* Post Header */}
          <div className="lg:col-span-2 lg:pr-8">
            <div className="flex justify-between">
              <h1 className={classNames(styles.postHeader, "sm:text-3xl")}>
                Villa for Sale in Manama
              </h1>
              <h1 className={classNames(styles.postHeader, "sm:text-3xl")}>
                {houses[0].price} BD
              </h1>
            </div>
            <h3 className={styles.post_subheader}>{houses[0].location}</h3>
          </div>
        </div>

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
                  <p className="item-text">{houses[0].area} sqm</p>
                </li>
                <li className="list-item">
                  <h2 className="item-heading">Bedrooms</h2>
                  <p className="item-text"> {houses[0].bedrooms}</p>
                </li>
                <li className="list-item">
                  <h2 className="item-heading">Bathrooms</h2>
                  <p className="item-text"> {houses[0].bathrooms}</p>
                </li>
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="">Features</h2>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4">
                  {houses[0].features.map((feature) => (
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
                <p className="">{houses[0].description}</p>
              </div>
            </div>
          </div>

          <div className="lg:row-span-3 lg:mt-0">
            <div className="">
              <Card
                title={agents[0].name}
                subtitle={agents[0].agency}
                imageUrl={agents[0].imageUrl}
                buttons={[
                  { label: "Call", onclick: "" },
                  { label: "Message", onclick: "" },
                  { label: "Whatsapp", onclick: "" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
