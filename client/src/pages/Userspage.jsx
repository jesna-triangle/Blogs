import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";

const UsersPage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { authorId } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  // const [authorData, setAuthorData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showProfileOnly, setShowProfileOnly] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
  });
  // const isOwnProfile = !authorId || authorId === userId;
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  // const getUserData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/users/${id}`
  //     );
  //     if (res.status === 200) {
  //       setUserData(res.data);
  //     }
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // };
  // const getAuthorData = async () => {
  //   // console.log(userId);
  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/users/${userId}`
  //     );
  //     if (res.status === 200) {
  //       setAuthorData(res.data);
  //     }
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // };


  const getBlogs = async () => {
    // if (showProfileOnly) return;
    if (showProfileOnly && !authorId) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/author/${authorId}`);
      if (res.status === 200) {
        console.log(res.data);
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.log("error:", error);
    }
    setIsLoading(false); // Move this here to ensure it's called after fetching blogs
  };

  // const getOwnBlogs = async () => {
  //   try {
  //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog`, {
  //       params: { authorId: userId },
  //     });
  //     if (res.status === 200) {
  //       setBlogs(res.data.blogs);
  //     }
  //   } catch (error) {
  //     console.log("Error fetching user's blogs:", error);
  //   }
  //   setIsLoading(false);
  // };

  // const getAuthorBlogs = async () => {
  //   try {
  //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog`, {
  //       params: { authorId },
  //     });
  //     if (res.status === 200) {
  //       setBlogs(res.data.blogs);
  //     }
  //   } catch (error) {
  //     console.log("Error fetching author's blogs:", error);
  //   }
  //   setIsLoading(false);
  // };
  const deleteBlog = async (blogId) => {
    console.log("delete blog with id:", blogId);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/blog/${blogId}`
      );
      if (res.status === 200) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));// Use _id for filtering
      }
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  };


  // const viewAuthorProfile = (authorId) => {
  //   // Navigate to the author's profile page
  //   navigate(`/users/${authorId}`);
  // };

  // useEffect(() => {
  //   getUserData();
  //   getAuthorData();
  //   getBlogs();
  // }, [id]);
  const getUserData = async () => {
    // let searchId
    // if (!authorId) {
    //   searchId = userId
    // } else {
    //   searchId = authorId
    // }
    const profileId = authorId || userId;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${profileId}`)
      if (res.status === 200) {
        setUserData(res.data);
      }
      console.log(res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  const handleFollowToggle = async () => {
    // if (userId !== authorId) return;
    if (isOwnProfile) return;
    try {
      console.log("id: ", userId);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/${userId}/follow`, {
        followerId: userId,
      });
      if (res.status === 200) {
        setIsFollowing(!isFollowing); // Toggle follow status
        setUserData((prevData) => ({ ...prevData, followers: res.data.followers }));
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const viewAuthorProfile = (authorId) => {
    navigate(`/users/${authorId}`);
    setShowProfileOnly(true); // Set flag to show only profile
  };

  // useEffect(() => {
  //   getUserData()
  //   getBlogs()
  // }, [showProfileOnly])

  const updateBlog = (blog) => {
    setEditingBlog(blog._id);
    console.log(blog._id);
    setBlogData({ blogId: blog._id, title: blog.title, content: blog.content, category: blog.category });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating blog with ID:", editingBlog);
    console.log("Blog data being sent:", blogData);

    try {
      const token = localStorage.getItem("token");
      console.log(editingBlog);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/blog/${editingBlog}`,
        blogData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.status === 200) {
        alert("Blog updated successfully!");
        setEditingBlog(null);
        getBlogs();
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
        alert(`Error: ${error.response.data.message || error.response.data}`);
      }
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getUserData();
    getBlogs();
  }, [authorId]);
  useEffect(() => {
    if (authorId == userId) {
      setIsOwnProfile(true)

    }
  }, [authorId])
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
                <h4>Email: {userData.email}</h4>
                {!isOwnProfile && (
                  <button onClick={handleFollowToggle} className="follow-btn">
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </>
            )}
          </div>

          {/* <div className="user-blogs">
            <h3>My Blogs</h3>
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
                  <button 
                    onClick={() => viewAuthorProfile(blog.author._id)} 
                    className="blog-author"
                  >
                    {blog.author.name}
                  </button>
                  <div className="blog-content">{blog.content}</div>
                </li>
              ))}
            </ul>
          </div>  */}

          {!showProfileOnly && (
            <div className="user-blogs">
              <h3>{userData ? `${userData.firstName}'s Blogs` : "My Blogs"}</h3>
              {editingBlog ? (
                <div className="create-post-container">
                  <h2>Update Post</h2>
                  <form onSubmit={handleUpdate}>
                    <div className="form-group">
                      {/* <label htmlFor="title"></label> */}
                      <label htmlFor="title">Title:</label>
                      <input
                        type="text"
                        name="title"
                        value={blogData.title}
                        onChange={handleUpdateChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Category:</label>
                      <select
                        name="category"
                        value={blogData.category}
                        onChange={handleUpdateChange}
                      >
                        <option value="">Select category</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Mobile & Web Development">Mobile & Web Development</option>
                        <option value="AI/ML">Artificial Intelligence (AI) & Machine Learning (ML)</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="content">Content:</label>
                      <textarea
                        id="content"
                        name="content"
                        value={blogData.content}
                        onChange={handleUpdateChange}
                        rows="5"
                        required
                      />
                    </div>

                    <button type="submit" className="submit-btn">
                      Update Post
                    </button>
                    <button type="button" onClick={() => setEditingBlog(null)}>Cancel</button>
                  </form>
                </div>
              ) : (
                <ul className="blog-list">
                  {blogs &&
                    blogs.map((blog) => (
                      <li key={blog._id} className="blog-page">
                        <div className="icon-container">
                          {isOwnProfile && (
                            <>
                              <MdDelete size={25} onClick={() => deleteBlog(blog._id)} />
                              <FaRegEdit
                                size={25}
                                className="update"
                                onClick={() => updateBlog(blog)}
                              />
                            </>
                          )}
                        </div>
                        <h1>{blog.title}</h1>
                        
                        <div>{blog.content}</div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

    </>
  );
};

export default UsersPage;
