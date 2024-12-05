import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser, setToken, setIsLoggedIn, backendUrl, token } =
    useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/user/login/", {
        email,
        password,
      });

      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        setIsLoggedIn(true);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        toast.success("Login seccessful",{
          position : "bottom-right",
          autoClose:2000,
          closeOnClick:true
        })
      }
    } catch (error) {
      toast.error(error.message,{
        position : "bottom-right",
        autoClose:2000,
        closeOnClick:true
      })
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="w-full flex justify-center mb-6">
          <Link to={"/"}>
            <img src={assets.logo} alt="Logo" height={150} width={120} />
          </Link>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Login Here
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block">
            <input
              type="email"
              id="email"
              className="border border-gray-300 w-full p-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="block">
            <input
              type="password"
              id="password"
              className="border border-gray-300 w-full p-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="w-full py-3 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 transition focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-teal-600 hover:text-teal-700"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
