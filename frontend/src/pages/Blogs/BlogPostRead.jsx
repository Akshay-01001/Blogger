import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { AppContext } from "../../Context/AppContext.jsx";
// import parser from "html-parser"
import parse from "html-react-parser";

const BlogPostRead = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { blogs, backendUrl } = useContext(AppContext);

  const getBlogDetails = () => {
    const blog = blogs.find((item) => item._id == id);

    setData(blog || null);
  };

  useEffect(() => {
    getBlogDetails();
  }, [blogs, id]);

  if (!data) {
    return <h1>Loading or Blog Not Found...</h1>;
  }

  return (
    <div>
      <div className="bg-gray-200 py-3 px-3 md:px-12">
        <Navbar />
        <div className="text-center my-24">
          <h1 className="text-xl sm:text-3xl font-semibold max-w-[700px] mx-auto">
            {data?.title}
          </h1>
          {data?.author && (
            <div>
              <img
                src={`${backendUrl}/${data.authorPic}`}
                alt={`${data.author.username}'s profile`}
                className="border border-white mx-auto mt-6 h-20 w-20 rounded-full"
              />
              <p className="mx-auto pt-1 md:pt-2 text-lg font-semibold">
                Author : {data.author}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[800px] md:mx-auto mt-[-80px] mb-10 mx-5">
        <img
          src={`${backendUrl}/${data?.thumbnail}`}
          alt="Blog Thumbnail"
          width={1280}
          height={720}
        />

        <h1 className="my-8 font-semibold text-xl">Description</h1>
        <div>{data?.description}</div>

        <h1 className="my-8 font-semibold text-xl">Content</h1>
        <div>{parse(data?.content)}</div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostRead;
