import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/index";
import Footer from "./footer";
export default function Layout() {
  return (
    <>
      <Header></Header>
      <div className="containerBox">
        <Outlet />
        <Footer></Footer>
      </div>
    </>
  );
}
