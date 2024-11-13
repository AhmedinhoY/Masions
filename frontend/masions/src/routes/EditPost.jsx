import { useLoaderData } from "react-router-dom";
import { AddPostForm } from "../components/AddPostForm/AddPostForm";



export const EditPost = () => {
  const property = useLoaderData();



  return (
    <>
      <main className=" w-full min-h-[70vh] bg-blue-gray-300 px-8 py-8">
        <h1> Edit Form </h1>
        <div className="w-full min-h-full px-[20rem]">
          <AddPostForm method={'patch'} property={property} />
        </div>
      </main>
    </>
  );
}



// this page is only accessed if: 
// user.id == creator id of the post 
// if user.id != creator id --> send him back to the homePage
