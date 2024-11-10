import { useLoaderData } from "react-router-dom";
import { PlaceDetailsItem } from "./PlaceDetailsItem";

export const PlaceDetail = () => {
  const place = useLoaderData();
  return (
    <>
      <main className=" w-full min-h-full  flex justify-center px-6 py-10">
        <PlaceDetailsItem place={place} />
      </main>
    </>
  );
};
