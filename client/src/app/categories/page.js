"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Categories = () => {
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
    <>
      <section className="py-24">
        <div className="container flex flex-col items-center gap-10">
          <h2 className="text-4xl font-semibold">All Categories</h2>
          <div className="w-full grid grid-cols-4 gap-6">
            {categories?.map((item, id) => (
              <div
                key={id}
                className="p-5 flex flex-col items-center gap-3 shadow-md"
              >
                <h3 className="text-2xl font-semibold">{item.category}</h3>
                <Link href="#" className="text-red-500 font-medium underline">
                  View Products
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
