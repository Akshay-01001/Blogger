import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";

const Sidebar = () => {
  const [active, setActive] = useState("add-blog");
  const { logout } = useContext(AppContext);
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    logout();
    navigate("/")
  };

  return (
    <div className="flex flex-col bg-slate-100 h-screen">
      <Link to={"/"}>
        <div className="px-2 sm:pl-14 py-3 border border-black cursor-pointer">
          <img src={assets.logo} alt="logo" width={120} />
        </div>
      </Link>
      <div className="w-full sm:w-80 h-full relative py-12 border border-black">
        <div className="w-[50%] sm:w-[80%] absolute right-2 my-2">
          <Link to={"add-blog"}>
            <div
              className={
                active === "add-blog"
                  ? "bg-orange-400 flex items-center border border-black gap-3 font-medium px-3 py-2  shadow-[-5px_5px_0px_#000000] cursor-pointer my-2"
                  : "bg-white flex items-center border border-black gap-3 font-medium px-3 py-2  shadow-[-5px_5px_0px_#000000] cursor-pointer my-2"
              }
              onClick={() => setActive("add-blog")}
            >
              <img src={assets.add_icon} alt="add" width={28} />
              <p>Add blogs</p>
            </div>
          </Link>

          <Link to={"view-blogs"}>
            <div
              className={
                active === "view-blogs"
                  ? "bg-orange-400 flex items-center border border-black gap-3 font-medium px-3 py-2  shadow-[-5px_5px_0px_#000000] cursor-pointer my-2"
                  : "bg-white flex items-center border border-black gap-3 font-medium px-3 py-2  shadow-[-5px_5px_0px_#000000] cursor-pointer my-2"
              }
              onClick={() => setActive("view-blogs")}
            >
              <img src={assets.blog_icon} alt="add" width={28} />
              <p>Blog Lists</p>
            </div>
          </Link>

          <Link to={"profile"}>
            <div
              className={
                active === "profile"
                  ? "bg-orange-400 flex items-center border border-black gap-3 font-medium px-3 py-2  shadow-[-5px_5px_0px_#000000] cursor-pointer my-2"
                  : "bg-white flex items-center border border-black gap-3 font-medium px-3 py-2  shadow-[-5px_5px_0px_#000000] cursor-pointer my-2"
              }
              onClick={() => setActive("profile")}
            >
              <img src={assets.profile_icon} alt="add" width={28} />
              <p>Profile</p>
            </div>
          </Link>

          <button
            className={
              active === "logout"
                ? "bg-orange-400 flex items-center border border-black gap-3 font-medium px-3 py-2  shadow-[-5px_5px_0px_#000000] cursor-pointer my-2"
                : "bg-white flex items-center border border-black gap-3 font-medium px-3 py-2  shadow-[-5px_5px_0px_#000000] cursor-pointer my-2"
            }
            onClick={() => {
              handleLogout();
              setActive("logout");
            }}
          >
            <img src={assets.add_icon} alt="add" width={28} />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
