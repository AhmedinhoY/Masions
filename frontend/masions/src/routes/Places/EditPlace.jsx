import { useLoaderData } from "react-router-dom";
import { NewPlaceForm } from "../../components/NewPlaceForm/NewPlaceForm";

export const EditPlace = () => {
  const place = useLoaderData();
  let titleCss = "text-2xl font-bold uppercase text-stone-800";

  return (
    <>
      <main className=" w-full min-h-full px-8 py-8">
        <div className="m-2">
          <h1 className={titleCss + " font-mono"}> Edit Form </h1>
        </div>
        <NewPlaceForm method={"patch"} place={place} />
      </main>
    </>
  );
};
