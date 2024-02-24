"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const FeedbackSchema = Yup.object().shape({
  feedback: Yup.string().required("Required"),
});

const Page = ({ params }) => {
  const { isLogin, userDetail } = useSelector((state) => state.user);
  const [product, setProduct] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [feedback, setFeedback] = useState([]);

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

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback/${params.id}`
      );
      setFeedback(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    fetchCart();
    fetchWishlist();
    fetchFeedbacks();
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

  const handleFeedback = async (values) => {
    const formData = {
      ...values,
      ...{ userName: userDetail.fullName, userEmail: userDetail.email },
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback/${params.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      toast.success(result.msg);
    } catch (err) {
      toast.error("Filed to send feedback!");
    }
  };

  const { handleSubmit, resetForm, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        feedback: "",
      },
      validationSchema: FeedbackSchema,
      onSubmit: (values) => {
        handleFeedback(values);
        resetForm();
      },
    });

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
            </div>
          </div>
        )}
      </section>
      <section className="py-20 bg-gray-100">
        <div className="container flex flex-col items-start gap-10">
          <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
          <div className="w-full flex gap-8">
            <div className="w-1/3 flex flex-col items-start gap-3 bg-white p-4">
              <h3 className="text-xl font-medium">Give Feedback</h3>
              <Formik>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-1 w-full items-start"
                >
                  <textarea
                    name="feedback"
                    id="feedback"
                    onChange={handleChange}
                    value={values.feedback}
                    rows="5"
                    className="border border-gray-600 w-full p-1"
                  ></textarea>
                  <button
                    type="submit"
                    className="border border-gray-600 py-1 px-2"
                  >
                    submit
                  </button>
                </form>
              </Formik>
            </div>
            <div className="w-2/3 bg-red-50 p-4 space-y-3">
              <h3 className="text-xl font-medium">Reviews</h3>
              <div className="flex flex-col gap-2 w-full">
                {feedback?.map((item, id) => (
                  <div
                    key={id}
                    className="w-full bg-white shadow p-2 flex flex-col items-start gap-4"
                  >
                    <p className="font-medium">{item.feedback}</p>
                    <small className="font-medium text-gray-600">
                      {item.userName}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
