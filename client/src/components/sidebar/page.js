"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaAngleRight, FaCartShopping } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";

const Sidebar = ({ width, height }) => {
  const dropdownRef = useRef(null);
  const [catalog, setCatalog] = useState(false);
  return (
    <aside className={` ${width} ${height} bg-gray-950 p-8 text-white`}>
      <ul className="space-y-3 font-medium">
        <li className="w-full">
          <Link
            href="/admin/dashboard"
            className="w-full flex items-center gap-2"
          >
            <MdDashboard />
            Dashboard
          </Link>
        </li>
        <li className="flex flex-col items-start gap-2 w-full">
          <button
            onClick={() => setCatalog(!catalog)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <BiCoinStack />
              Catalog
            </div>
            <FaAngleRight
              className={`text-base transition-all duration-200 ease-linear ${
                catalog ? "rotate-90" : "rotate-0"
              }`}
            />
          </button>
          <div
            ref={dropdownRef}
            style={{
              maxHeight: `${
                catalog ? `${dropdownRef.current.scrollHeight}px` : "0px"
              }`,
            }}
            className={`transition-all duration-200 ease-linear w-full text-base bg-gray-100 text-black`}
          >
            <div className="flex w-full flex-col items-start gap-1 p-3">
              <Link href="/admin/productList" className="w-full">
                Product List
              </Link>
              <Link href="/admin/products" className="w-full">
                Product
              </Link>
              <Link href="/" className="w-full">
                Category List
              </Link>
              <Link href="/admin/categories" className="w-full">
                Category
              </Link>
            </div>
          </div>
        </li>
        <li className="w-full">
          <Link
            href="/admin/customer"
            className="w-full flex items-center gap-2"
          >
            <FaRegUser />
            Customers
          </Link>
        </li>
        <li className="w-full">
          <Link href="/admin/order" className="w-full flex items-center gap-2">
            <FaCartShopping />
            Orders
          </Link>
        </li>
        <li className="w-full">
          <Link href="/admin/review" className="w-full flex items-center gap-2">
            <BiSolidMessageRounded />
            Reviews
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
