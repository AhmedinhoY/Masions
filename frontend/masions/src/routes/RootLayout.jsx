import { NavBar } from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
