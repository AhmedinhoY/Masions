/* eslint-disable react/prop-types */
import { PlaceItem } from "./PlaceItem";

export const PlacesList = ({ places }) => {
  return (
    <>
      <div className=" px-6 py-8 flex flex-col gap-3 min-w-[100%] min-h-full mx-auto ">
        <h1 className="bg-yellow-300 min-w-[100%] px-4 py-2">
          Page filters here ...
        </h1>

        {places.length === 0 && (
          <h2 className=" text-center capitalize font-bold text-2xl font-mono px-6 py-3 bg-white rounded-md drop-shadow-xl">
            {" "}
            There are no places created Yet, Be the First to add one{" "}
          </h2>
        )}

        {places.length > 0 && (
          <ul className=" flex flex-wrap gap-2 ">
            {places.map((p) => {
              return (
                <PlaceItem
                  key={p.id}
                  place={p}
                  classes={"hover:bg-stone-200"}
                />
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};
