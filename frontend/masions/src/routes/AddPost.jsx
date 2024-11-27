/* eslint-disable no-unused-vars */
import { AddForm } from "../components/AddPostForm/AddForm";
import { AddProperty } from "../components/AddPostForm/AddProperty";

export const AddPost = () => {
  return (
    <>
      <div className="container">
        <section>
          <h1 className="container-header">Sell</h1>
          {/* <AddForm /> */}
          <div className="container-body">
            <AddProperty />
          </div>
        </section>
      </div>
    </>
  );
};
