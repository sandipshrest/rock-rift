import React from "react";
import FeatureData from "@/data/FeatureData";

const Feature = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container grid grid-cols-4 gap-6">
        {FeatureData?.map((dataItem, id) => (
          <div key={id} className="flex flex-col items-center gap-2">
            <div className="text-3xl">{dataItem.icon}</div>
            <h3 className="text-xl font-semibold">{dataItem.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
