"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex items-center gap-8">
          <button onClick={() => router.push("/admin/products")}>
            Add Products
          </button>
          <button onClick={() => router.push("/admin/categories")}>
            Add Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
