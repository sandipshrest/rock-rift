"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Wishlist = ({ toggleWishlist }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/");
      setWishlistItems(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <section
      className={`fixed w-96 h-screen py-14 border border-black bg-white top-0 transition-all duration-500 ease-linear ${
        toggleWishlist ? "left-0" : "-left-96"
      }`}
    >
      <div className="px-10 pb-3 border-b border-black">
        <h2 className="text-2xl font-semibold">My Wishlist</h2>
      </div>
      <div className="px-10 pt-4">
        {wishlistItems.length > 0 ? (
          <div>
            {wishlistItems.map((item, id) => (
              <div key={id}>
                <h3>{item.product}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3>Your wishlist is empty</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
