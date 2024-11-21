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
import { EditPost } from "./routes/EditPost";
import { AddPost } from "./routes/AddPost";

import { action as formAction } from "./components/AddPostForm/form-script";
import {
  loadPlaces,
  loadProperty,
  deleteProperty,
  loadBoth,
} from "./routes/property-script";
import { Auth } from "./routes/Users/auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/useAuth";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: loadPlaces },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signUp",
        element: <RegisterForm />,
      },
      {
        path: "/houses",
        children: [
          { path: "for-sale", element: <SaleHouses />, loader: loadPlaces },
          { path: "for-rent", element: <RentHouses />, loader: loadPlaces },
        ],
      },
      {
        path: "apartments",
        children: [
          { path: "for-sale", element: <SaleApartments />, loader: loadPlaces },
          { path: "for-rent", element: <RentApartments />, loader: loadPlaces },
        ],
      },
      {
        path: "lands",
        children: [
          { path: "for-sale", element: <SaleLands />, loader: loadPlaces },
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
            element: <EditPost />,
            loader: loadProperty,
            action: formAction,
          },
        ],
      },
      { path: "/add-post", element: <AddPost />, action: formAction },
      { path: "/wishlist", element: <WishList /> },
      { path: "/agents", element: <AgentsList /> },
      { path: "/explore", element: <Explore /> },
      { path: "/auth", element: <Auth /> },
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
  const { login, logout, token, userId } = useAuth();

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          uid: userId,
          login: login,
          logout: logout,
        }}
      >
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
};
