"use client";
import DashboardLayout from "@/components/dashboardLayout/page";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

const page = () => {
  const [product, setProduct] = useState([]);
  const [openModal, setOpenModal] = useState(null);

  const handleDelete = async (productId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`
      );
    } catch (err) {
      console.log(err);
    }
  };

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
  }, [handleDelete]);

  const handleModal = (num) => {
    if (openModal === null || openModal !== num) {
      setOpenModal(num);
    } else if (openModal === num) {
      setOpenModal(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full h-full bg-gray-100 p-5 space-y-4">
        <h2 className="text-2xl font-semibold">Product List</h2>
        <div className="bg-white">
          <table className="w-full">
            <thead className="border-b-2 sticky bg-white top-0">
              <tr className="text-lg">
                <th className="text-start ps-4 py-2">Product</th>
                <th className="text-start ps-4 py-2">Category</th>
                <th className="text-start ps-4 py-2">Price</th>
                <th className="text-start ps-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {product?.map((item, id) => (
                <tr key={id} className="border-b">
                  <td className="flex flex-col ps-4 py-3">
                    {/* <img
                      src={item.image}
                      alt={item.product}
                      className="w-32 h-32 object-contain"
                    /> */}
                    <h3 className="text-lg font-semibold">{item.product}</h3>
                  </td>
                  <td className="ps-6 py-3 font-medium">
                    <p className="w-20">{item.category}</p>
                  </td>
                  <td className="ps-6 py-3 font-medium">
                    <p className="w-20">{item.price}</p>
                  </td>
                  <td className="ps-6 py-3 font-medium relative">
                    <button onClick={() => handleModal(id)}>
                      <HiDotsVertical />
                    </button>
                    {openModal === id && (
                      <div className="absolute flex flex-col items-start w-32 gap-2 p-3 bg-gray-50 shadow-md z-10 top-10 -left-16">
                        <button className="w-full text-start">Edit</button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="w-full text-start"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
