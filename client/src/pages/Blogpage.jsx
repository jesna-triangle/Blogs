import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const BlogPage = () => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog`);
      if (res.status == 200) {
        setBlogs(res.data.blogs);
        // console.log(blogs);
      }
    } catch (error) {
      console.log("error:", error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          {blogs &&
            blogs.map((blog, key) => {
              return (
             
               
                <div key={key} className="blog-page">
                   <div className="container">
                     <MdDelete size={25} className="delete" />
                      <FaRegEdit size={25} className="edit" />
                </div>
                 
                  <h1 className="blog-title">{blog.title}</h1>
                 
                  <p className="blog-author">{blog.author}</p>
                  <div className="blog-content">{blog.content}</div>
                </div>
              );
            })}
        </>
      )}
    </>
  );
};
 
export default BlogPage;
