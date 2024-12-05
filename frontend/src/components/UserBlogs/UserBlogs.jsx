import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";

const UserBlogs = () => {
  const [data, setData] = useState([]);
  const { blogs, backendUrl, user } = useContext(AppContext);

  const setUserBlogs = () => {
    const userBlogs = blogs.filter((item) => item.authorEmail == user.email);
    setData(userBlogs);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(backendUrl + `/api/blogs/delete`, {
        params: { id },
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });

      if (data.success) {
        toast.success("Blog Deleted", {
          position: "bottom-right",
          autoClose: 2000,
          closeOnClick: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, [1000]);
      }
    } catch (error) {
      toast.success(error.message, {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
      });
    }
  };

  useEffect(() => {
    setUserBlogs();
  }, [blogs, user]);

  return (
    <div className="h-screen w-full mt-2 overflow-hidden">
      <p className="my-2">All Blogs</p>
      {data.length > 0 ? (
        <>
          <table className="min-w-full">
            <thead className="border border-black">
              <tr className="font-semibold bg-gray-100 text-sm sm:text-lg text-gray-700">
                <td className="sm:px-5 px-1">AUTHOR NAME</td>
                <td className="sm:px-5 px-1">BLOG TITLE</td>
                <td className="sm:px-5 px-1">DATE</td>
                <td className="sm:px-5 px-1">ACTION</td>
              </tr>
            </thead>

            <tbody>
              {data.map((blog, index) => (
                <tr key={index} className="border border-black">
                  <td className="sm:px-5 px-1 flex flex-wrap items-center gap-2 py-2">
                    <img
                      src={`${backendUrl}/${user.profile_pic}`}
                      alt="Author"
                      className="h-7 w-7 rounded-full"
                    />
                    <p>{blog.author}</p>
                  </td>
                  <td className="sm:px-5 px-1 py-2">{blog.title}</td>
                  <td className="sm:px-5 px-1 py-2">
                    {new Date(blog.created_at).toLocaleString()}
                  </td>
                  <td className="sm:px-5 px-1 py-2 sm:flex justify-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mx-2"
                      onClick={() =>
                        (window.location.href = `/blogs/${blog._id}`)
                      }
                    >
                      View
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="font-bold text-lg">You Don't Have Created Any Blogs !!</p>
      )}
    </div>
  );
};

export default UserBlogs;
