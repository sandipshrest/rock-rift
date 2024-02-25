'use client'
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
    const searchProducts = useSelector(state => state.search)
  return (
    <section className="pb-24 pt-28 bg-gray-50">
        {JSON.stringify({searchProducts})}
      <div className="container flex flex-col items-start gap-12">
        <h2 className="text-2xl font-semibold">Searched Product</h2>
        <div className="grid grid-cols-5 gap-8"></div>
      </div>
    </section>
  );
};

export default page;
