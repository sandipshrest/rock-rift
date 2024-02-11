import React from "react";
import Sidebar from "../sidebar/page";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div>{children}</div>
    </>
  );
};

export default AdminLayout;
