import React, { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import axios from "axios";

const FeatureProduct = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/featured");
      setFeaturedProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  console.log(featuredProducts);
  return (
    <section className="py-24">
      <div className="container flex flex-col items-start">
        <h2 className="text-4xl font-semibold">Feature Products</h2>
        <div className="w-full grid grid-cols-5 gap-6">
          {featuredProducts?.map((item, id) => (
            <ProductItem item={item} key={id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProduct;
