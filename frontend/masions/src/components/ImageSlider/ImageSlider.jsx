/* eslint-disable react/prop-types */
import { Carousel } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function ImageSlider({ imgCollection, propertyID }) {
  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex }) => (
        <div className="absolute bottom-4 left-2/4 z-1 flex -translate-x-2/4 gap-2">
          {new Array(imgCollection.length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={(e) => {
                e.preventDefault(); // Prevents scrolling to the top
                setActiveIndex(i);
              }}
            />
          ))}
        </div>
      )}
    >
      {imgCollection.map((img) => (
        // changed this item from <a> to <div>
        <Link key={img.imgNo} to={`/${propertyID}/post-details`}>
          <img
            src={`http://localhost:3000/${img.imgSrc}`}
            alt={img._id}
            className="h-full w-full object-cover"
          />
        </Link>
      ))}
    </Carousel>
  );
}
