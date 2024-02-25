"use client";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = ({ width, height }) => {
  const [catalog, setCatalog] = useState(false);
  return (
    <aside className={` ${width} ${height} bg-gray-950 p-8 text-white`}>
      <ul className="space-y-3 font-medium text-lg">
        <li>
          <Link href="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="flex flex-col items-start gap-2 w-full">
          <button onClick={() => setCatalog(!catalog)}  className="w-full text-start" >Catalog</button>
          {catalog && (
            <div className="flex w-full flex-col items-start gap-1 text-base p-3 bg-gray-100 text-black">
              <Link href="/" className="w-full">Product List</Link>
              <Link href="/admin/products" className="w-full">Product</Link>
              <Link href="/" className="w-full">Category List</Link>
              <Link href="/admin/categories" className="w-full">Category</Link>
            </div>
          )}
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
