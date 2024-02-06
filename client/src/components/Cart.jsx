'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = ({ toggleCart }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCarts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/");
      setCartItems(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <section
      className={`fixed w-96 h-screen py-14 border border-black bg-white top-0 transition-all duration-500 ease-linear ${
        toggleCart ? "left-0" : "-left-96"
      }`}
    >
      <div className="px-10 pb-3 border-b border-black">
        <h2 className="text-2xl font-semibold">My Cart</h2>
      </div>
      <div className="px-10 pt-4">
        {cartItems.length > 0 ? (
          <div>
            {cartItems?.map((item, id) => (
              <div key={id}>
                <h3>{item.product}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3>Your Cart is empty</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
