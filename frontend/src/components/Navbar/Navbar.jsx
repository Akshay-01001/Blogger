import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios if not already imported
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";

const Navbar = () => {

  const {isLoggedIn} = useContext(AppContext)
  
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="w-28 sm:w-40"/>
        </Link>

        {isLoggedIn ? (
          <Link to="/userpanel">
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
              User Panel
            </button>
          </Link>
        ) : (
          <Link to="/register">
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
