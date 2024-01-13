import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="py-3 sticky top-0">
      <div className="container flex items-center justify-between">
        <nav></nav>
        <div className="flex items-center gap-3">
          <Link href="/login">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
