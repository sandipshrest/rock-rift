"use client";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Image from "next/image";
import axios from "axios";

const Main = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const { data: res } = await axios.get(
        "http://localhost:5000/admin/products"
      );
      setProducts(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);

  return (
    <>
      {/* <Banner /> */}
      <section className="py-20">
        <div className="container flex flex-col items-start gap-6">
          <h2 className="text-4xl font-semibold">Products</h2>
          <div className="w-full grid grid-cols-5 gap-5">
            {products?.map((item, id) => (
              <div
                key={id}
                className="bg-gray-50 rounded-md flex flex-col items-start gap-1 p-3 border border-gray-500"
              >
                <Image
                  src="/"
                  priority={true}
                  width={2000}
                  height={2000}
                  alt={item.product}
                  className="w-full h-52 object-cover object-top"
                />
                <h3 className="text-2xl font-bold">{item.product}</h3>
                <small className="font-semibold text-gray-600">
                  {item.category}
                </small>
                <p>Price: {item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
