"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/reducerSlice/cartSlice";
import { addToWishlist } from "@/redux/reducerSlice/wishlistSlice";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLogin } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/carts");
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch("http://localhost:5000/wishlists");
      const data = await response.json();
      setWishlistItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, []);

  const itemInStore = (itemList, item) => {
    return itemList?.some((storeItem) => storeItem.product === item.product);
  };

  const handleAddCart = async (value) => {
    try {
      const response = await fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      if (response.ok) {
        dispatch(addToCart(value));
        fetchCart();
      }
    } catch (err) {
      toast.error("Failed to add to the cart!");
    }
  };

  const handleAddWishlist = async (value) => {
    try {
      const response = await fetch("http://localhost:5000/wishlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      if (response.ok) {
        dispatch(addToWishlist(value));
        fetchWishlist();
      }
    } catch (err) {
      toast.error("Failed to add to the wishlist!");
    }
  };

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
          disabled={itemInStore(cartItems, item)}
          onClick={() => {
            isLogin
              ? handleAddCart(item)
              : toast.error("Login first to add cart!");
          }}
          className={`flex w-8 h-8 justify-center items-center border border-gray-600 rounded-full transition-all duration-200 ease-linear`}
        >
          <FiShoppingCart />
        </button>
        <button
          onClick={() => router.push(`/products/${item._id}`)}
          className="flex w-8 h-8 justify-center items-center border border-gray-600 rounded-full hover:bg-rose-600 hover:text-white hover:border-white transition-all duration-200 ease-linear"
        >
          <FaRegEye />
        </button>
        <button
          disabled={itemInStore(wishlistItems, item)}
          onClick={() => {
            isLogin
              ? handleAddWishlist(item)
              : toast.error("Login first to add wishlist!");
          }}
          className={`flex w-8 h-8 justify-center items-center border border-gray-600  rounded-full transition-all duration-200 ease-linear`}
        >
          <FaRegHeart />
        </button>
      </div>
      <div className="flex flex-col items-start gap-1 justify-between grow">
        <h3 className="text-2xl font-bold">{item.product}</h3>
        <small className="font-semibold text-gray-600">{item.category}</small>
        <p>Price: {item.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
