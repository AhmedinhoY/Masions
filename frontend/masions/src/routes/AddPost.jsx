/* eslint-disable no-unused-vars */
import { AddForm } from "../components/AddPostForm/AddForm";
import { AddPostForm } from "../components/AddPostForm/AddPostForm";



export const AddPost = () => {
  return (
    <>
      <main className=" w-full min-h-[70vh] px-8 py-8">
        <h1> Add a new Place </h1>
        <div className="w-full min-h-full px-[20rem]">
          {/* <AddPostForm method={'post'} /> */}
          <AddForm />
        </div>
      </main>
    </>
  );
}