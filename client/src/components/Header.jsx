import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

const Header = () => {
  return (
    <header className="py-3 fixed top-0 w-full bg-transparent">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo.png"
            priority={true}
            height={2000}
            width={2000}
            alt="logo"
            className="w-28"
          />
        </Link>
        <nav>
          <ul className="flex items-center font-medium gap-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#">Category</Link>
            </li>
            <li>
              <Link href="/#">About</Link>
            </li>
            <li>
              <Link href="/#">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-5 items-center">
          <Link href="/login" className="text-xl">
            <FaRegUser />
          </Link>
          <Link href="/#" className="text-xl">
            <IoCartOutline />
          </Link>
          <Link href="/#" className="text-xl">
            <CiHeart />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
