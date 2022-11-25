import React from "react";

const Category = ({ categories }) => {
  const totalCategory = [
    "water",
    "wastes",
    "corruption",
    "roads",
    "others",
    "mosquitos",
  ];

  return (
    <div className="mt-10 mb-16 max-w-3xl mx-auto">
      <p className="bg-gray-100 flex justify-center rounded-lg font-semibold text-gray-500 my-3 py-1">
        Complains By Category
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 place-items-center gap-8">
        {totalCategory.map((category, i) => (
          <div
            key={i}
            className="bg-gray-100 w-44 py-10 text-center rounded-xl"
          >
            <p>{categories[category] ? categories[category] : 0}</p>
            <p className="capitalize">{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
