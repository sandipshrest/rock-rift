"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";

const Sidebar = ({ width, height }) => {
  const dropdownRef = useRef(null);
  const [catalog, setCatalog] = useState(false);
  return (
    <aside className={` ${width} ${height} bg-gray-950 p-8 text-white`}>
      <ul className="space-y-3 font-medium text-lg">
        <li>
          <Link href="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="flex flex-col items-start gap-2 w-full">
          <button
            onClick={() => setCatalog(!catalog)}
            className="w-full flex items-center justify-between"
          >
            Catalog{" "}
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
              <Link href="/" className="w-full">
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
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
