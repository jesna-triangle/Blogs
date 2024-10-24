import React, { useEffect, useState } from 'react'
import BlogCard from '../components/Blogcard'
import axios from 'axios'

const Home = () => {
  const [blogData, setBlogData] = useState(null)

  const getBlogData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/`)
      if (res.status == 200) {
        setBlogData(res.data.blogs)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    getBlogData()
  }, [])


  return (
    <div>
      {
        blogData && blogData.map((blog, key) => {
          return (

            <BlogCard blog={blog}
            key={key} />
          )
        })
      }
    </div>
  )
}

export default Home

