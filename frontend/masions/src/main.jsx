import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout";

import "./index.css";
import HomePage from "./routes/HomePage";
import PostDetails from "./routes/PostDetails";
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
import { SaleHouses } from "./routes/SaleHouses";
import { RentHouses } from "./routes/RentHouses";
import { Wishist } from "./routes/Wishist";
import { AgentsList } from "./routes/AgentsList";
import { SaleLands } from "./routes/SaleLands";
import { SaleApartments } from "./routes/SaleApartments";
import { RentApartments } from "./routes/RentApartments";
import { Explore } from "./routes/Explore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/post-details", element: <PostDetails /> },
      { path: "/houses-for-sale", element: <SaleHouses /> },
      { path: "/houses-for-rent", element: <RentHouses /> },
      { path: "/apartments-for-sale", element: <SaleApartments /> },
      { path: "/apartments-for-rent", element: <RentApartments /> },
      { path: "/lands-for-sale", element: <SaleLands /> },
      { path: "/wishlist", element: <Wishist /> },
      { path: "/agents", element: <AgentsList /> },
      { path: "/explore", element: <Explore /> },
    ],
  },
  {
    path: "/places",
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
