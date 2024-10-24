import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <>
    
    <div className="blog-card ">
      <div className="blog-card-content ">
        <h2 className="blog-title">{blog.title}</h2>
        <button onClick={() => navigate('/register/login')} className="read-more-link">
      Read More
    </button>
        
      </div>
    </div>
     
   </>
  );
};

export default BlogCard;
