import { NavBar } from "../shared/NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
