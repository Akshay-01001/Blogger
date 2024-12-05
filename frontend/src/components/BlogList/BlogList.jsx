import React, { useContext, useEffect, useState } from "react";
import BlogItem from "../BlogItem/BlogItem";
// import axios from "axios";
import { AppContext } from "../../Context/AppContext";
// import App from "../../App";

const BlogList = () => {
  const [cat, setCat] = useState("All");
  const { backendUrl } = useContext(AppContext);
  const {blogs} = useContext(AppContext);


  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          className={
            cat === "All"
              ? "bg-black text-white px-3 py-1 rounded-sm"
              : "text-black"
          }
          onClick={() => setCat("All")}
        >
          All
        </button>
        <button
          onClick={() => setCat("Technology")}
          className={
            cat === "Technology"
              ? "bg-black text-white px-3 py-1 rounded-sm"
              : "text-black"
          }
        >
          Technology
        </button>
        <button
          onClick={() => setCat("Startup")}
          className={
            cat === "Startup"
              ? "bg-black text-white px-3 py-1 rounded-sm"
              : "text-black"
          }
        >
          Startup
        </button>
        <button
          onClick={() => setCat("Lifestyle")}
          className={
            cat === "Lifestyle"
              ? "bg-black text-white px-3 py-1 rounded-sm"
              : "text-black"
          }
        >
          Lifestyle
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-7 mb-16 xl:mx-24">
        {blogs
          .filter((item) => cat === "All" || item.category === cat)
          .map((item,index) => (
            <BlogItem
              key={index}
              id={item._id}
              title={item.title}
              desc={item.description}
              image={item.thumbnail}
              category={item.category}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
