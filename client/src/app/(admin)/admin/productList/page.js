"use client";
import DashboardLayout from "@/components/dashboardLayout/page";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full h-full bg-gray-100 p-5">
        <h2>Product List</h2>
        <div className="p-2 bg-white">
          {product?.map((item, id) => (
            <div key={id} className="w-full">
              <h3>{item.product}</h3>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
