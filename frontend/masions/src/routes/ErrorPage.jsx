import { useRouteError } from "react-router-dom";
import { PageContent } from "../components/PageContent/PageContent";
import { NavBar } from "../shared/NavBar/NavBar";

export const ErrorPage = () => {
  const error = useRouteError();

  // console.log(error.message); // access the error message  
  // console.log(error.status);  // get the status of the error 
  // console.log(error.data); // get any extra meta data 


  let title = "an Error Occured";
  let message = "Something have gone wrong hello world";

  if (error.status === 500) {
    if (!error){ 
      console.log('Error object is not configured correctly');
    } else {
      message = error.message;
    }
  }

  if (error.status === 404) {
    title = "Page not Found";
    message = "Please go to a correct Page";
  }

  return (
    <>
      <NavBar />
      <PageContent title={title}>
        <p className="mt-8">{message}</p>
      </PageContent>
    </>
  );
};
