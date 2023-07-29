import React from "react";
import "./CategoriesCard.css";

function CategoriesCard({ categoryItem }) {
  const { _id, thumbnail, src, category } = categoryItem;

  return (
    <div className="category-card">
      <img
        src={thumbnail}
        alt="category-thumbnail"
        className="category-thumbnail"
      />
      <p className="category-name">{category}</p>
    </div>
  );
}

export default CategoriesCard;
