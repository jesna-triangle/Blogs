import { useState, useEffect } from "react";
import axios from "axios";
import Blogpage from "../pages/Blogpage";
import { useNavigate } from "react-router-dom";
 
 
const CreatePostPage = () => {
  //   const [category, setCategory] = useState("");
  //   const [title, setTitle] = useState(""); // State for the post title
  //   const [description, setDescription] = useState(""); // State for the post description
  const token = localStorage.getItem("token");
  const [postData, setPostData] = useState([]);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
   
  });
  const navigate = useNavigate();
 
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(blogData);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog`,
        blogData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(res.status==200){
        console.log("Blog posted:",res.data);
        getPostData();
        navigate(`/blog/${res.data._id}`);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
 
  const getPostData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog`);
      if (res.status === 200) {
        setPostData(res.data.posts);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };
 
  useEffect(() => {
    getPostData();
  }, []);
 
  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <h2>Create a New Post</h2>
 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange} // Update title state
              required
            />
          </div>
 
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={blogData.category}
              onChange={handleChange}
            >
               <option value="">Select category</option>
                      <option value="Software Development">Software Development</option>
                      <option value="Mobile & Web Development">Mobile & Web Development</option>
                      <option value="AI/ML">Artificial Intelligence (AI) & Machine Learning (ML)</option>
                      <option value="Technology">Technology</option>
                      <option value="Cloud Computing">Cloud Computing</option>
            </select>
          </div>
 
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="content"
              value={blogData.content}
              onChange={handleChange} // Update description state
              rows="5"
              required
            />
          </div>
 
          <button  type="submit" className="submit-btn">
            Create Post
          </button>
        </form>
 
        <div>
          {postData &&
            postData.map((post, key) => {
              return <Blogpage post={post} key={key} />;
            })}
        </div>
      </div>
    </div>
  );
};
 
export default CreatePostPage;
 