import React, { useContext } from "react";
import { AppContext } from "../..";
import "./Landing.css";
import CategoriesCard from "../../Components/Cards/CategoriesCard/CategoriesCard";
import { Link } from "react-router-dom";

function Landing() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="main-page">
      <h3 className="page-heading">Categories</h3>
      <section className="categories-section">
        <ul className="categories-list">
          {state.categoriesList?.map((category) => {
            return (
              <Link
                to="/videos"
                id={category._id}
                onClick={() => {
                  dispatch({
                    type: "UPDATE_FILTER_CATEGORY_NAME",
                    payload: category.category,
                  });
                }}
              >
                <CategoriesCard categoryItem={category} />
              </Link>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default Landing;
