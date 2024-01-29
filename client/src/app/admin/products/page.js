"use client";
import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/react";
import { toast } from "react-hot-toast";

const ProductSchema = Yup.object().shape({
  product: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
});

const Product = () => {
  // fetching categories & subcategories
  const [categories, setCategories] = useState([]);
  const fetchProduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/categories");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAdd = async (values) => {
    console.log(values);
    // try {
    //   const response = await fetch("http://localhost:5000/admin/categories", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(values),
    //   });
    //   const result = await response.json();
    //   if (response.status === 201) {
    //     toast.success(result.msg);
    //   } else {
    //     toast.error(result.msg);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const { handleSubmit, resetForm, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        category: "",
        subCategory: "",
        product: "",
        price: "",
      },
      validationSchema: ProductSchema,
      onSubmit: (values) => {
        handleAdd(values);
        resetForm();
      },
    });

  console.log(categories);
  return (
    <div className="w-full h-screen flex flex-col gap-8 justify-center items-center bg-black">
      <div className="w-1/4 flex flex-col items-center gap-5 bg-white py-8 px-10">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <Formik>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6 w-full"
          >
            <div className="flex flex-col items-start w-full">
              <Input
                type="text"
                name="product"
                variant="underlined"
                label="product"
                value={values.product}
                onChange={handleChange}
              />
              {errors.product && touched.product ? (
                <div>{errors.product}</div>
              ) : null}
              <Input
                type="number"
                name="price"
                variant="underlined"
                label="price"
                value={values.price}
                onChange={handleChange}
              />
              {errors.price && touched.price ? <div>{errors.price}</div> : null}
            </div>

            <button
              type="submit"
              className="bg-thirdColor text-white py-1 px-2"
            >
              Add Product
            </button>
          </form>
        </Formik>
      </div>
    </div>
  );
};

export default Product;
