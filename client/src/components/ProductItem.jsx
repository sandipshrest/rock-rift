"use client";
import Image from "next/image";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { addCart } from "@/redux/reducerSlice/cartSlice";
import { addWishlist } from "@/redux/reducerSlice/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductItem = ({ item }) => {
  const wishlistItems = useSelector((state) => state.wishlist);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="group bg-gray-50 rounded-md flex flex-col items-start gap-1 p-3 border border-gray-500 relative">
      <Image
        src="/"
        priority={true}
        width={2000}
        height={2000}
        alt={item.product}
        className="w-full h-52 object-cover object-top"
      />
      <div className="flex gap-3 absolute left-1/2 -translate-x-1/2 top-52 opacity-0 group-hover:top-44 group-hover:opacity-100 transition-all duration-300 ease-linear">
        <button
          disabled={cartItems.includes(item)}
          onClick={() => dispatch(addCart(item))}
          className="flex w-8 h-8 justify-center items-center border border-gray-600 rounded-full hover:bg-rose-600 hover:text-white hover:border-white transition-all duration-200 ease-linear"
        >
          <FiShoppingCart />
        </button>
        <button className="flex w-8 h-8 justify-center items-center border border-gray-600 rounded-full hover:bg-rose-600 hover:text-white hover:border-white transition-all duration-200 ease-linear">
          <FaRegEye />
        </button>
        <button
          disabled={wishlistItems.includes(item)}
          onClick={() => dispatch(addWishlist(item))}
          className="flex w-8 h-8 justify-center items-center border border-gray-600 rounded-full hover:bg-rose-600 hover:text-white hover:border-white transition-all duration-200 ease-linear"
        >
          <FaRegHeart />
        </button>
      </div>
      <h3 className="text-2xl font-bold">{item.product}</h3>
      <small className="font-semibold text-gray-600">{item.category}</small>
      <p>Price: {item.price}</p>
    </div>
  );
};

export default ProductItem;
