import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import BlogPostRead from "./pages/Blogs/BlogPostRead";
import UserPanel from "./pages/UserPanel/UserPanel";
import AddBlog from "./components/AddBlog/AddBlog";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import UserBlogs from "./components/UserBlogs/UserBlogs";
import { toast, ToastContainer } from "react-toastify";
import { AppContext } from "./Context/AppContext";

function App() {
  const { token } = useContext(AppContext);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      toast.info("Please login first.", {
        autoClose: 1000,
        closeOnClick: true,
      });
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<BlogPostRead />} />
          <Route
            path="/userpanel"
            element={
              <ProtectedRoute>
                <UserPanel />
              </ProtectedRoute>
            }
          >
            <Route index element={<AddBlog />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="view-blogs" element={<UserBlogs />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
