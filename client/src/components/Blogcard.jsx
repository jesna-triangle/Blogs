import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const userId=localStorage.getItem("userId");


  const readBlog = (e) => {
    e.preventDefault();
    // console.log("blog: ",blog);
    if(userId){
      // console.log("user loggedin") 
      navigate(`/blog/${blog._id}`);
    }

  else{console.log("user not logged in")
    navigate("/register/login");
  }

  };
 

  

  return (
    <>
      <div className="blog-card ">
        <div className="blog-card-content ">
          <h2 className="blog-title">{blog.title}</h2>
          <button onClick={readBlog} className="read-more-link">
            Read More
          </button>
          
        </div>
      </div>
    </>
  );
};

export default BlogCard;
