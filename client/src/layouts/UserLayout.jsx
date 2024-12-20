import React from "react";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";
import { Outlet } from "react-router-dom";
const UserLayout = () => {
  return (
    <div>
      <div>
        <div>
          <UserNavbar />
        </div>
        <main
          className="container m-0 p-0"
          style={{ minHeight: "90vh", margin: "10px" }}
        >
          <Outlet />
        </main>
        <div>
          <UserFooter />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
