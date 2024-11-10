import { NewPlaceForm } from "../../components/NewPlaceForm/NewPlaceForm";

export const NewPlace = () => {
  return (
    <>
      <main className=" flex flex-col min-h-[70vh] items-center gap-3">
        <h1> This is the New Place Page </h1>
        <NewPlaceForm method={"post"} />
      </main>
    </>
  );
};
