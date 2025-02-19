/* eslint-disable no-unused-vars */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout";

import "./index.css";
import HomePage from "./routes/HomePage";
import PostDetails from "./routes/PostDetails";
import { ErrorPage } from "./routes/ErrorPage";

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
import { AuthContext, AuthProvider } from "./shared/context/auth-context";
import { DialogProvider } from "./shared/context/dialog-context";
import {
  DropDownDialogProvider,
  EditProfileDialogProvider,
  SellerReqDialogProvider,
} from "./shared/context/dropdowndialog-context";

import AuthenticationForm from "./components/AuthenticationForms/AuthenticationForm";
import { EditProperty } from "./routes/EditProperty";
import ScrollToTop from "./shared/util/scrollToTop";
import { ToastProvider } from "./shared/context/Toast-context";
import { Messages } from "./routes/Messages";
import { HousePricePrediction } from "./routes/HousePricePrediction";
import { StableDiff } from "./routes/StableDiff";
import { RentLands } from "./routes/RentLands";
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
          { path: "for-rent", element: <RentLands />, loader: loadProperties },

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
      { path: "/wishlist/:id", element: <WishList /> },
      { path: "/messages/:AgentId?", element: <Messages /> },
      { path: "/agents", element: <AgentsList /> },
      { path: "/explore", element: <Explore /> },
      { path: "/auth", element: <AuthenticationForm /> },
      {
        path: "/ai", children: [
          {
            path: 'house-price-prediction',
            element: <HousePricePrediction />,
          },
          {
            path: 'stable-diffusion',
            element: <StableDiff />,
          }
        ]
      },
    ],
  },
]);

export const App = () => {
  const { login, logout, signUp, token, user } = useContext(AuthContext);

  return (
    <>
      <ToastProvider>
        <EditProfileDialogProvider>
          <SellerReqDialogProvider>
            <DropDownDialogProvider>
              <DialogProvider>
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
                  <RouterProvider router={router}>
                    <ScrollToTop />
                  </RouterProvider>
                </AuthProvider>
              </DialogProvider>
            </DropDownDialogProvider>
          </SellerReqDialogProvider>
        </EditProfileDialogProvider>
      </ToastProvider>
    </>
  );
};
