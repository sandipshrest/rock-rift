"use client";
import DashboardLayout from "@/components/dashboardLayout/page";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";

const page = () => {
  const [product, setProduct] = useState([]);
  const [productDetail, setProductDetail] = useState();
  const [openAction, setOpenAction] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(null);

  const handleDelete = async (productId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProductDetail = async (productId) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`
      );
      setProductDetail(data);
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

  const handleAction = (num) => {
    if (openAction === null || openAction !== num) {
      setOpenAction(num);
    } else if (openAction === num) {
      setOpenAction(null);
    }
  };

  // if (openAction !== null) {
  //   document.body.addEventListener("click", setOpenAction(null));
  // }

  return (
    <DashboardLayout>
      <div className="w-full h-full bg-gray-100 p-6 space-y-4">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Product List</h2>
          <Link
            href="/admin/products"
            className="py-1 px-2 bg-blue-700 text-white"
          >
            Add Product
          </Link>
        </div>
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
                    <button onClick={() => handleAction(id)}>
                      <HiDotsVertical />
                    </button>
                    {openAction === id && (
                      <div className="absolute flex flex-col items-start w-32 gap-2 p-3 bg-gray-50 shadow-md z-10 top-10 -left-16">
                        <button
                          onClick={() => {
                            fetchProductDetail(item._id);
                            setOpenEditForm(id);
                            setOpenAction(null);
                          }}
                          className="w-full text-start"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(item._id);
                            setOpenAction(null);
                          }}
                          className="w-full text-start"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {openEditForm === id && (
                      <div className="fixed w-full h-full inset-0 z-20 flex justify-center items-center bg-black bg-opacity-70">
                        <div className="w-1/2 p-5 bg-white shadow-lg space-y-2">
                          <button
                            onClick={() => setOpenEditForm(null)}
                            className="size-10 ms-auto bg-white flex items-center justify-center rounded-full shadow-lg"
                          >
                            <FaXmark />
                          </button>
                          <div className="w-full flex flex-col items-start gap-4">
                            <h3 className="text-2xl font-semibold">
                              Edit Productdetail
                            </h3>
                          </div>
                          {JSON.stringify(productDetail)}
                        </div>
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
