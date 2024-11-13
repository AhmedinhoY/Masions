import { AddPostForm } from "../components/AddPostForm/AddPostForm";



export const AddPost = () => {
  return (
    <>
      <main className=" w-full min-h-[70vh] bg-blue-gray-300 px-8 py-8">
        <h1> Add a new Place </h1>
        <div className="w-full min-h-full px-[20rem]">
          <AddPostForm method={'post'} />
        </div>
      </main>
    </>
  );
}