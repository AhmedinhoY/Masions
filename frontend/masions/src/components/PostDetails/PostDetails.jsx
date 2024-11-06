import styles from "./PostDetails.module.css";
import classNames from "classnames";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
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
    city: "Manama ",
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

export default function Example() {
  return (
    <div className="">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              alt={product.images[0].alt}
              src={product.images[0].src}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt={product.images[1].alt}
                src={product.images[1].src}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt={product.images[2].alt}
                src={product.images[2].src}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              alt={product.images[3].alt}
              src={product.images[3].src}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Post info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          {/* Post Header */}
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
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

          {/* column */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>

            {/* Reviews */}
            <div className="mt-6">
              <h2 className="not-sr-only">Agent</h2>
              <div className="flex items-center">
                <div className="flex items-center"></div>
              </div>
            </div>
          </div>

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
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
