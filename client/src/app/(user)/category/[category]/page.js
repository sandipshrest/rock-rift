"use client";
import ProductItem from "@/components/ProductItem";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${params.category}`
      );
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [params.category]);
  return (
    <>
      <section className="py-10"></section>
      <section className="py-20">
        <div className="container flex flex-col items-start gap-10">
          <h2 className="text-3xl font-semibold">{params.category}</h2>
          <div className="w-full grid grid-cols-5 gap-8">
            {products?.map((item, id) => (
              <ProductItem key={id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
