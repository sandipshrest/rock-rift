import React from "react";
import Sidebar from "../sidebar/page";
import Image from "next/image";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <header className="flex">
        <div className="w-2/12 bg-gray-100 py-3 ps-8">
          <Image
            src="/images/logo.png"
            height={2000}
            width={2000}
            alt="logo"
            className="w-28"
          />
        </div>
        <div className="w-10/12 bg-gray-200 px-3"></div>
      </header>
      <div className="flex grow">
        <Sidebar width={"w-2/12"} height={"h-full"} />
        <div className="w-10/12 p-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
