import PropertiesList from "../components/PropertiesList/PropertiesList";

export default function HomePage() {
  const houses = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      city: "Manama ",
      type: "House",
      bedrooms: 4,
      bathrooms: 4,
      area: 403,
      zipcode: 85255,
      price: 86500,
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      city: "Sitra",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      area: 333,
      zipcode: 36372,
      price: 86200,
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      city: "Muharraq ",
      type: "Villa",
      bedrooms: 3,
      bathrooms: 4,
      area: 393,
      zipcode: 85266,
      price: 88000,
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      city: "Sanabis",
      type: "House",
      bedrooms: 5,
      bathrooms: 5,
      area: 402,
      zipcode: 85262,
      price: 91000,
    },
  ];

  return (
    <div className="container">
      <section>
        <h1>Houses for Sale</h1>
        <PropertiesList propertyType={houses} />{" "}
      </section>
    </div>
  );
}
