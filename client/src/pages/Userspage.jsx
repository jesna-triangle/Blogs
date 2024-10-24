import React, { useEffect, useState } from 'react';
import BlogCard from '../components/Blogcard';
import axios from 'axios';

const UsersPage = () => {
    const userId = localStorage.getItem("userId")

    const [userData, setUserData] = useState(null)

    const getUserData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
            if (res.status == 200) {
                setUserData(res.data)
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    useEffect(() => {
        getUserData()
    }, [])


    return (
        <div className="user-page">
            <div className="user-details">
                {
                    userData && <><h2>{userData.firstName} {userData.lastName}</h2>
                        <p>Email: {userData.email}</p>
                    </>
                }


                {/* <button className="follow-btn" onClick={handleFollowToggle}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button> */}
            </div>

            <div className="user-blogs">
                <h3>User's Blogs</h3>
                <ul className="blog-list">
                </ul>
            </div>
        </div>
    );
};

export default UsersPage;

