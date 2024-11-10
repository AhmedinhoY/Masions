import { useRouteError } from "react-router-dom";
import { PageContent } from "../components/PageContent/PageContent";
import { NavBar } from "../shared/NavBar/NavBar";

export const ErrorPage = () => {
  const error = useRouteError();

  console.log(error);

  let title = "an Error Occured";
  let message = "Something have gone wrong";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
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
