import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserPosts } from '../../services/api';

const UserProfile = () => {
  // Assuming your Redux store contains user information
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const { userId } = useParams();
  console.log(userId)

  const [posts, setPosts] = useState([]); // [post1, post2, post3
  
  useEffect(() => {
    // Fetch user profile data using userId
    const fetchData = async () => {
        try{
            const res = await getUserPosts(userId);
            if (res.status === 200) {
                console.log('Posts fetched successfully!');
                setPosts(res.data);
                console.log("posts: ", posts)
            } else {
                console.log('No posts!');
                // console.log("posts: ", posts)
            }
            // console.log("posts: ", posts)
            // setPosts(posts);
        } catch (error) {
            console.error(error);
        }
    }
    fetchData();
  }, [userId])
    
  return (
    <div className="flex flex-col items-center justify-center mx-auto mt-8 container border-2 p-6 bg-white rounded shadow-md">
      <div className="flex items-center justify-between mb-4 border-2 border-red-500 text-center">
        <h2 className="text-3xl font-semibold">{user.firstName}'s Profile</h2>
        {/* Add Edit Profile button or settings icon for profile customization */}
      </div>
      <div className="flex items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
          <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-gray-600">{user.email}</p>
          {/* Add other user details like bio, location, etc. */}
        </div>
      </div>
      <div className="mt-6">
        {/* Add tabs for different sections like Posts, Friends, etc. */}
        <ul className="flex space-x-4">
          <li className="text-blue-500 cursor-pointer">Posts</li>
          <li className="text-blue-500 cursor-pointer">Friends</li>
          {/* Add more tabs as needed */}
        </ul>
      </div>
      {/* Display user's posts or other relevant content */}
      <div className="mt-8">
        {/* Example: List of user's posts */}
        {/* You can map over user.posts and display each post */}
        { posts.length ? posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border rounded-md">
            <p>{post.content}</p>
            {/* Add like, comment, and other actions */}
          </div>
        )):
        <p>No posts yet!</p>}
      </div>
    </div>
  );
};

export default UserProfile;
