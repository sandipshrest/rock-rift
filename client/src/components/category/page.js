"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
      );
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <section className="py-24 bg-red-200">
      <div className="container flex flex-col items-center gap-6">
        <h2 className="text-4xl font-semibold">Categories</h2>
        <div className="w-full grid grid-cols-4 grid-rows-2 gap-5">
          {categories?.slice(0, 5).map((item, id) => (
            <div
              key={id}
              className={`${
                id === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
              } bg-gray-200 flex flex-col gap-2 justify-center items-center p-8`}
            >
              <h3 className="text-2xl font-semibold">{item.category}</h3>
              <Link
                href={`/category/${item.category}`}
                className="underline font-medium text-red-600"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
        <Link
          href="/category"
          className="inline-block py-1 px-2 bg-red-600 text-white border border-red-600 font-medium"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default Category;
