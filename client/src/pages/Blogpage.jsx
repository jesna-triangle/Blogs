import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/Authcontext";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [authorId, setAuthorId] = useState("");
  const [authorNam, setAuthorNam] = useState(null)

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const url = id
        ? `${import.meta.env.VITE_API_URL}/blog/${id}`
        : `${import.meta.env.VITE_API_URL}/blog`;

      const response = await axios.get(url);


      if (response.status === 200) {
        setBlogs(response.data);
        // setAuthorId(response.data.author)

        authorName(response.data.author);
      } else {
        console.error("Unexpected response format:", response.data);
        setBlogs([]); // Ensure blogs remains an array even if there's an error
      }
    } catch (error) {
      console.error("Error fetching blog: ", error);
    }
    setIsLoading(false);
  };
  const authorName = async (authorId) => {
    try {
      console.log(authorId);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${authorId}`)
      // console.log(res.data)
      if(res.status==200){
        const name=`${res.data.firstName} ${res.data.lastName}`
        setAuthorNam(name)
      }
    } catch (error) {
      console.log(error);

    }
  }
  // const fetchBlog = async () => {
  //   console.log(id);
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/blog/${id}`
  //     );
  //     console.log(response.data);
  //     if (response.status == 200) {
  //       setBlog(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching blog: ", error);
  //   }
  //   setIsLoading(false);
  // };
  const viewAuthorProfile = (authorId) => {
    // e.preventDefault();
    console.log(authorId);
    navigate(`/user/${authorId}`);
  };

  useEffect(() => {
    fetchBlog();

  }, []);
  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div key={blogs._id} className="blog-page">
          <h1 className="blog-title">{blogs.title}</h1>
          <div className="blog-email">{blogs.email}</div>
          <button
            onClick={() => viewAuthorProfile(blogs.author)}
            className="author-btn"
          >
            {authorNam}
          </button>
          <div className="blog-content">{blogs.content}</div>
        </div>
      )}
    </>
  );
};

export default BlogPage;

