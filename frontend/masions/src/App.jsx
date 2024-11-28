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
import { AgentsList } from "./routes/AgentsList";
import { SaleLands } from "./routes/SaleLands";
import { SaleApartments } from "./routes/SaleApartments";
import { RentApartments } from "./routes/RentApartments";
import { Explore } from "./routes/Explore";
import { WishList } from "./routes/WishList";
import { AddPost } from "./routes/AddPost";

import { action as formAction } from "./components/AddPostForm/form-script";
import {
  loadProperties,
  loadProperty,
  deleteProperty,
  loadBoth,
} from "./routes/property-script";

import { useContext } from "react";
import { AuthContext } from "./shared/context/auth-context";
import { AuthProvider } from "./shared/context/auth-context";

import AuthenticationForm from "./components/AuthenticationForms/AuthenticationForm";
import { EditProperty } from "./routes/EditProperty";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: loadProperties },
      {
        path: "/login",
        element: <AuthenticationForm />,
      },
      {
        path: "/signUp",
        element: <AuthenticationForm />,
      },
      {
        path: "/houses",
        children: [
          { path: "for-sale", element: <SaleHouses />, loader: loadProperties },
          { path: "for-rent", element: <RentHouses />, loader: loadProperties },
        ],
      },
      {
        path: "apartments",
        children: [
          {
            path: "for-sale",
            element: <SaleApartments />,
            loader: loadProperties,
          },
          {
            path: "for-rent",
            element: <RentApartments />,
            loader: loadProperties,
          },
        ],
      },
      {
        path: "lands",
        children: [
          { path: "for-sale", element: <SaleLands />, loader: loadProperties },
        ],
      },
      {
        path: ":id",
        children: [
          {
            path: "post-details",
            element: <PostDetails />,
            loader: loadBoth,
            action: deleteProperty,
          }, // general post details for: apartments, houses, lands
          {
            path: "edit",
            element: <EditProperty />,
            loader: loadProperty,
            action: formAction,
          },
        ],
      },
      { path: "/add-post", element: <AddPost />, action: formAction },
      { path: "/wishlist", element: <WishList /> },
      { path: "/agents", element: <AgentsList /> },
      { path: "/explore", element: <Explore /> },
      { path: "/auth", element: <AuthenticationForm /> },
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

export const App = () => {
  const { login, logout, signUp, token, user } = useContext(AuthContext);

  return (
    <>
      <AuthProvider
        value={{
          isLoggedIn: !!token,
          token: token,
          uid: user ? user.id : null,

          login: login,
          logout: logout,
          signUp: signUp,
        }}
      >
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};
