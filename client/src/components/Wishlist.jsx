import React from "react";
import { useSelector } from "react-redux";

const Wishlist = ({ toggleWishlist }) => {
  const wishlistItems = useSelector((item) => item.wishlist);
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
