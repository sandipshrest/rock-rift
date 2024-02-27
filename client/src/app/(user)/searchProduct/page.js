"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductItem from "@/components/ProductItem";

const page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [searchProduct, setSearchProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/search?productName=${search}`
      );
      setSearchProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [search]);

  return (
    <section className="pb-24 pt-28 bg-gray-50">
      <div className="container flex flex-col items-start gap-12">
        <h2 className="text-2xl font-semibold">Searched Result for {search}</h2>
        <div className="grid grid-cols-5 gap-8">
          {searchProduct?.map((item, id) => (
            <ProductItem item={item} key={id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
