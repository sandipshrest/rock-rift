"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Wishlist = ({ wishlistItems, toggleWishlist }) => {
  return (
    <section
      className={`fixed w-[900px] h-screen py-14 border border-black bg-white top-0 transition-all duration-500 ease-linear ${
        toggleWishlist ? "left-0" : "-left-[900px]"
      }`}
    >
      <div className="px-10 pb-3 border-b border-black">
        <h2 className="text-2xl font-semibold">My Wishlist</h2>
      </div>
      <div className="px-10 pt-4 w-full">
        {wishlistItems.length > 0 ? (
          <div className="w-full">
            <div className="w-full">
              <table className="w-full bg-gray-100">
                <thead className="border-b-2 border-gray-400">
                  <tr>
                    <th className="text-start p-2">Product</th>
                    <th className="text-start p-2">Price</th>
                    <th className="text-start p-2">Cart</th>
                    <th className="text-start p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item, id) => (
                    <tr key={id}>
                      <td className="p-2">
                        <p className="text-lg font-medium">{item.product}</p>
                      </td>
                      <td className="p-2">{item.price}</td>
                      <td className="p-2">
                        <button className="py-1 px-2 text-sm bg-gray-950 text-white">
                          Add to Cart
                        </button>
                      </td>
                      <td className="p-2">
                        <button className="py-1 px-2 text-sm bg-red-600 text-white">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
