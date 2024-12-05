import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [blogs, setBlogs] = useState([]);

  const fetBlogs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/blogs/get-blogs/");

      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
     
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user")
    setUser(null);
    setToken(null);
    toast.info("Logged out",{
      position : "bottom-right",
      autoClose:2000,
      closeOnClick:true
    })
  };

  useEffect(() => {
    fetBlogs();
    const token = sessionStorage.getItem("token")
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (!token) {
      setIsLoggedIn(false);
      setToken(null);
    } else {
      setToken(token);
      setIsLoggedIn(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser)); 
      }
    }
  }, [token]);

  const value = {
    backendUrl,
    setUser,
    user,
    setIsLoggedIn,
    isLoggedIn,
    setToken,
    token,
    logout,
    blogs,
    setBlogs,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
