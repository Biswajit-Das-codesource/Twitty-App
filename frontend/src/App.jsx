import React from "react";
import Login from "./Pages/Login";
import Navbar from "./Pages/Navbar";
import { Navigate, Outlet } from "react-router";
import Feed from "./Pages/Feed";
import { useSelector } from "react-redux";

function App() {
  return (
    <>
      <div className="h-screen w-full flex flex-col overflow-hidden">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
