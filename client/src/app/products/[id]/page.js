"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Page = ({ params }) => {
  const { isLogin } = useSelector((state) => state.user);
  const [product, setProduct] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // fetching cartlist, wishlist & productdetail
  const fetchCart = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`);
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlists`
      );
      const data = await response.json();
      setWishlistItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProductDetail = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
      );
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    fetchCart();
    fetchWishlist();
  }, []);

  // check if item already exist on list or not
  const itemInStore = (itemList, item) => {
    return itemList?.some((storeItem) => storeItem.product === item.product);
  };

  // add to cart function
  const handleAddCart = async (value) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      if (response.ok) {
        fetchCart();
      }
    } catch (err) {
      toast.error("Failed to add to the cart!");
    }
  };

  // add to wishlist function
  const handleAddWishlist = async (value) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlists`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        }
      );
      if (response.ok) {
        fetchWishlist();
      }
    } catch (err) {
      toast.error("Failed to add to the wishlist!");
    }
  };

  return (
    <>
      <section className="py-10"></section>
      <section className="py-20">
        {product && (
          <div className="container flex gap-10">
            <div className="w-1/3"></div>
            <div className="w-2/3 flex flex-col items-start gap-6">
              <div className="flex flex-col items-start gap-1">
                <small className="text-base font-medium">
                  {product.category}
                </small>
                <h2 className="text-2xl font-bold">{product.product}</h2>
                <p>Price: {product.price}</p>
                <div className="flex items-center gap-5">
                  <button
                    disabled={itemInStore(cartItems, product)}
                    onClick={() => {
                      isLogin
                        ? handleAddCart(product)
                        : toast.error("Login first to add cart!");
                    }}
                    className="bg-red-600 text-white py-1 px-2"
                  >
                    Add Cart
                  </button>
                  <button
                    disabled={itemInStore(wishlistItems, product)}
                    onClick={() => {
                      isLogin
                        ? handleAddWishlist(product)
                        : toast.error("Login first to add wishlist!");
                    }}
                    className="bg-red-600 text-white py-1 px-2"
                  >
                    Add Wishlist
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-1">
                <h3>Give Feedback</h3>
                <textarea
                  name=""
                  id=""
                  rows="5"
                  className="border border-gray-600 w-1/2"
                ></textarea>
                <button className="border border-gray-600">submit</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Page;
