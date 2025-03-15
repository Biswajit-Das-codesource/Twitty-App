import React from "react";
import Login from "./Pages/Login";
import Navbar from "./Pages/Navbar";
import { Outlet } from "react-router";
import Feed from "./Pages/Feed";

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
