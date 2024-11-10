import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout";

import "./index.css";
import HomePage from "./routes/HomePage";
import PostDetails from "./components/PostDetails/PostDetails";
import Places from "./routes/Places/Places";
import { PlaceDetail } from "./routes/Places/PlaceDetails";
import { EditPlace } from "./routes/Places/EditPlace";
import { NewPlace } from "./routes/Places/NewPlace";
import { action as placeFormAction } from "./components/NewPlaceForm/form-actions";
import { ErrorPage } from "./routes/ErrorPage";
import {
  loader as placesLoader,
  loadPlace,
  deletePlaceAction,
} from "./routes/Places/Places-script";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/post-details", element: <PostDetails /> },
      {
        path: "places",
        children: [
          { index: true, element: <Places />, loader: placesLoader },
          {
            path: ":placeId",
            element: <PlaceDetail />,
            loader: loadPlace,
            action: deletePlaceAction,
          },
          {
            path: ":placeId/edit",
            element: <EditPlace />,
            loader: loadPlace,
            action: placeFormAction,
          },
          { path: "new-place", element: <NewPlace />, action: placeFormAction },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
