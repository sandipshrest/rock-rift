import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="py-3">
      <div className="container flex justify-between">
        <Link href="/">
          <Image
            src="/images/logo.png"
            priority={true}
            height={2000}
            width={2000}
            alt="logo"
            className="w-32"
          />
        </Link>
        <div>
            <Link href="/login">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
