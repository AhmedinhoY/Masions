/* eslint-disable no-unused-vars */
import { EditPost } from "../components/EditPostForm/EditPost";

export const EditProperty = () => {
  return (
    <>
      <div className="container">
        <section>
          <h1 className="container-header">Edit</h1>
          {/* <AddForm /> */}
          <div className="container-body">
            <EditPost />
          </div>
        </section>
      </div>
    </>
  );
};
