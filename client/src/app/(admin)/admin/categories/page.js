"use client";
import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const CategorySchema = Yup.object().shape({
  category: Yup.string().required("Required"),
});

const Category = () => {
  const handleAdd = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        values
      );
    } catch (err) {
      console.log(err);
    }
  };

  const { handleSubmit, resetForm, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        category: "",
        subCategory: [],
      },
      validationSchema: CategorySchema,
      onSubmit: (values) => {
        handleAdd(values);
        resetForm();
      },
    });
  return (
    <div className="w-full h-screen flex flex-col gap-8 justify-center items-center bg-black">
      <div className="w-2/5 flex flex-col items-center gap-5 bg-white py-8 px-10">
        <h1 className="text-2xl font-semibold">Add Category</h1>
        <Formik>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6 w-full"
          >
            <div className="flex flex-col items-start w-full">
              <Input
                type="text"
                name="category"
                variant="underlined"
                label="category"
                value={values.category}
                onChange={handleChange}
              />
              {errors.category && touched.category ? (
                <div>{errors.category}</div>
              ) : null}
            </div>
            <div className="w-full">
              <p>Create sub-category</p>
              <CreatableSelect
                onChange={(newValue) =>
                  (values.subCategory = newValue.map((item) => item.value))
                }
                isMulti
              />
            </div>
            <button
              type="submit"
              className="bg-thirdColor text-white py-1 px-2"
            >
              Add
            </button>
          </form>
        </Formik>
      </div>
    </div>
  );
};

export default Category;
