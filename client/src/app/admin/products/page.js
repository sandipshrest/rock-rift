"use client";
import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  Dropdown,
  Input,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Switch,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import axios from "axios";

const ProductSchema = Yup.object().shape({
  product: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
});

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // fetching categories & subcategories
  const [categories, setCategories] = useState([]);
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/categories`);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAdd = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
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
        subCategory: "",
        product: "",
        price: "",
        isFeatured: false,
      },
      validationSchema: ProductSchema,
      onSubmit: (values) => {
        values.category = selectedCategory;
        values.subCategory = selectedSubCategory;
        handleAdd(values);
        resetForm();
      },
    });

  return (
    <div className="w-full h-screen flex flex-col gap-8 justify-center items-center bg-black">
      <div className="w-1/4 flex flex-col items-center gap-5 bg-white py-8 px-10">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <Formik>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6 w-full"
          >
            <div className="flex flex-col items-start w-full gap-3">
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
              <div>
                <p>Feature product</p>
                <Switch
                  name="isFeatured"
                  // onClick={(e) => console.log(e.currentTarget)}
                  value={values.isFeatured}
                  onChange={handleChange}
                  aria-label="Automatic updates"
                />
              </div>
              <div className="flex justify-between w-full">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      {selectedCategory || "Choose category"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    {categories.map((item, id) => {
                      return (
                        <DropdownItem
                          onClick={(e) =>
                            setSelectedCategory(e.target.outerText)
                          }
                          key={id}
                        >
                          {item.category}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      {selectedSubCategory || "Choose subcategory"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    {categories.map((item) => {
                      return (
                        item.category === selectedCategory &&
                        item.subCategory.map((subCategoryItem, id) => (
                          <DropdownItem
                            onClick={(e) =>
                              setSelectedSubCategory(e.target.outerText)
                            }
                            key={id}
                          >
                            {subCategoryItem}
                          </DropdownItem>
                        ))
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </div>
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
