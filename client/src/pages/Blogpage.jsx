import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/Authcontext";

const BlogPage = () => {
  const { id } = useParams(); // Get the blog id from the URL
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchBlog = async () => {
    console.log(id);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/${id}`
      );
      console.log(response.data);
      if (response.status == 200) {
        setBlog(response.data);
      }
    } catch (error) {
      console.error("Error fetching blog: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      {isLoading ? <span>Loading...</span> : (
        <div className="blog-page">
          <h1 className="blog-title">{blog.title}</h1>
          <div className="blog-email">{blog.email}</div>
          <p className="blog-author">By {blog.author}</p>
          <div className="blog-content">{blog.content}</div>
        </div>
      )}
    </>
  );
};

export default BlogPage;

