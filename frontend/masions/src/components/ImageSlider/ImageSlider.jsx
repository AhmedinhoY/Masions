/* eslint-disable react/prop-types */
import { Carousel } from "@material-tailwind/react";

export function ImageSlider({ imgCollection }) {
  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex }) => (
        <div className="absolute bottom-4 left-2/4 z-1 flex -translate-x-2/4 gap-2">
          {new Array(imgCollection.length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
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
        <div className="h-[42.8vh] object-contain" key={img.imgNo} >
          <img
            src={img.imgSrc}
            alt={img.imgNo}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
}
