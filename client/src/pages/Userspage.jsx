import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";

const UsersPage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}`
      );
      if (res.status === 200) {
        setUserData(res.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog`);
      if (res.status === 200) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.log("error:", error);
    }
    setIsLoading(false); // Move this here to ensure it's called after fetching blogs
  };

  const deleteBlog = async (blogId) => {
    console.log("delete blog with id:", blogId);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/blog/${blogId}`
      );
      if (res.status === 200) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId)); // Use _id for filtering
      }
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  };
   const UpdateBlog = async(id) => { 
    console.log("update blog with id:", id);
  };


  useEffect(() => {
    getUserData();
    getBlogs();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="user-page">
          <div className="user-details">
            {userData && (
              <>
                <h2>
                  {userData.firstName} {userData.lastName}
                </h2>
                <p>Email: {userData.email}</p>
              </>
            )}
          </div>

          <div className="user-blogs">
            <h3>User Blogs</h3>
            <ul className="blog-list">
              {blogs && blogs.map((blog, key) => (
                <li key={key} className="blog-page">
                  <div className="container">
                    <MdDelete
                      size={25}
                      className="delete"
                      onClick={() => deleteBlog(blog._id)}
                    />
                    <FaRegEdit
                      size={25}
                      className="update"
                      onClick={() => navigate(`/user/${blog._id}/update/`)}
                    />
                  </div>

                  <h1 className="blog-title">{blog.title}</h1>
                  <p className="blog-author">{blog.author}</p>
                  <div className="blog-content">{blog.content}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersPage;
