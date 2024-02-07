import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="py-4 bg-gray-100">
      <div className="container">
        <div className="text-center">
          <p>Copyright &copy; {date} Rock-Rift. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
