import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../services/api";
import EditProfileForm from "./EditProfileForm";
import Post from "../posts/Post";
import CreatePost from "../posts/CreatePost";
// import Sidebar from "../nav/SideBar";

const UserProfile = () => {
  // Assuming your Redux store contains user information
  const user = useSelector((state) => state.auth.user);
  const { userId } = useParams();

  const [posts, setPosts] = useState([]); // [post1, post2, post3
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileModalOpen(false);
  };
  const handleNewPostClick = () => {
    console.log("New Post Clicked");
    setIsCreatePostModalOpen(true);
  };
  const handleNewPostClose = () => {
    setIsCreatePostModalOpen(false);
  };

  useEffect(() => {
    // Fetch user profile data using userId
    const fetchData = async () => {
      try {
        const res = await getUserPosts(userId);
        if (res.status === 200) {
          console.log("Posts fetched successfully!");
          setPosts(res.data);
        } else {
          console.log("No posts!");
          // console.log("posts: ", posts)
        }
        // console.log("posts: ", posts)
        // setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId, isCreatePostModalOpen]);

  return (
    <>
      <div className=" max-w-[75%] md:w-[70%]">
        <div class="flex bg-gray-200 p-8 rounded-lg shadow-md w-3/4 h-max">
          <img
            src={user.profilePicture}
            alt="User Avatar"
            class=" w-48 h-48 rounded-full mb-4"
          />
          <div className=" m-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.firstName + " " + user.lastName}
            </h2>
            <p className="text-gray-600 mb-2">{user.friends.length} Friends</p>
            <div className="mt-4">
              {user.location && (
                <div className="mt-2">
                  <p className="text-gray-700 font-semibold">Location</p>
                  <p className="text-gray-600">{user.location}</p>
                </div>
              )}
              {user.occupation && (
                <div className="mt-2">
                  <p className="text-gray-700 font-semibold">Occupation</p>
                  <p className="text-gray-600">{user.occupation}</p>
                </div>
              )}
              {user.bio && (
                <div className="mt-2">
                  <p className="text-gray-700 font-semibold">Bio</p>
                  <p className="text-gray-600">{user.bio}</p>
                </div>
              )}
            </div>

            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              onClick={handleEditProfileClick}
            >
              Edit Profile
            </button>
            <EditProfileForm
              isOpen={isEditProfileModalOpen}
              onClose={handleEditProfileClose}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 w-3/4 h-max gap-4">
          {posts.length ? (
            posts.map((post) => <Post key={post._id} post={post} UpdatePosts={()=>setPosts} />)
          ) : (
            <div className="col-span-1 flex flex-col items-center justify-start mt-6">
              <p className="text-center text-gray-600 font-bold text-xl mb-4">
                No posts yet!
              </p>
              <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleNewPostClick}
              >
                New Post
              </button>
              <CreatePost 
              isOpen={isCreatePostModalOpen}
              onClose={handleNewPostClose}
              userId={userId}
              setPosts={setPosts}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
// <div className="flex flex-col w-full md:w-[70%] mx-auto">
//   <div className="w-full h-72 bg-gray-200 rounded-md shadow-md">
//     <img
//       src={
//         user.coverPicture
//           ? user.coverPicture
//           : "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//       }
//       alt="cover"
//       className="w-full h-full object-cover rounded-b-md"
//     />
//     <div className="relative grid-cols-1 left-1/2 transform -translate-x-1/2 -translate-y-3/4 bg-transparent w-36 h-36">
//       <div className="rounded-full overflow-hidden">
//         <img
//           src={user.profilePicture}
//           alt="Profile"
//           className="rounded-full w-full h-full object-cover border-4 border-white"
//         />
//       </div>
//       <div className="mt-2 text-lg font-semibold text-center mt-3.5">{`${user.firstName} ${user.lastName}`}</div>
//     </div>
//   </div>
//   <div className="flex justify-between mt-24">
//     {/* User Posts */}
//     <div className="flex-grow border-2 border-cyan-500 mt-4 p-4">
//       <h2 className="text-lg font-semibold">Posts</h2>
//       <ul className="list-disc pl-6">
//         {/* Map through user.posts and render each post */}
//         {/*user.posts.map((post, index) => (
//         <li key={index}>{post}</li>
//       )) */}
//       </ul>
//     </div>
//     {/* User Information */}
//     <div className="mt-4 text-gray-600 p-4">
//       <h2 className="text-lg font-semibold">User Information</h2>
//       <div class="bg-gray-200 p-8 rounded-lg shadow-md max-w-md mx-auto">
//         <h2 class="text-2xl font-bold text-gray-800 mb-2">John Doe</h2>
//         <p class="text-gray-600 mb-4">@johndoe</p>
//         <div class="grid grid-cols-2 gap-4">
//           <div>
//             <p class="text-gray-700 font-semibold">Followers</p>
//             <p class="text-gray-600">1,234</p>
//           </div>
//           <div>
//             <p class="text-gray-700 font-semibold">Following</p>
//             <p class="text-gray-600">567</p>
//           </div>
//         </div>
//         <div class="mt-6">
//           <p class="text-gray-700 font-semibold">Bio</p>
//           <p class="text-gray-600">
//             Passionate about technology and coding. 🚀
//           </p>
//         </div>

//         <button class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
//           Edit Profile
//         </button>
//       </div>

//       <p className="text-base font-bold">email: {user.email}</p>
//       <p>Location: {user.location}</p>
//       {/* Add more user information as needed */}
//     </div>
//   </div>
// </div>
// <div className="flex flex-col items-center justify-center mx-auto mt-8 container border-2 p-6 bg-white rounded shadow-md">
//   <div className="flex items-center justify-between mb-4 border-2 border-red-500 text-center">
//     <h2 className="text-3xl font-semibold">{user.firstName}'s Profile</h2>
//     {/* Add Edit Profile button or settings icon for profile customization */}
//   </div>
//   <div className="flex items-center">
//     <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
//       <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
//     </div>
//     <div>
//       <p className="text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</p>
//       <p className="text-gray-600">{user.email}</p>
//       {/* Add other user details like bio, location, etc. */}
//     </div>
//   </div>
//   <div className="mt-6">
//     {/* Add tabs for different sections like Posts, Friends, etc. */}
//     <ul className="flex space-x-4">
//       <li className="text-blue-500 cursor-pointer">Posts</li>
//       <li className="text-blue-500 cursor-pointer">Friends</li>
//       {/* Add more tabs as needed */}
//     </ul>
//   </div>
//   {/* Display user's posts or other relevant content */}
//   <div className="mt-8">
//     {/* Example: List of user's posts */}
//     {/* You can map over user.posts and display each post */}
//     { posts.length ? posts.map((post) => (
//       <div key={post.id} className="mb-4 p-4 border rounded-md">
//         <p>{post.content}</p>
//         {/* Add like, comment, and other actions */}
//       </div>
//     )):
//     <p>No posts yet!</p>}
//   </div>
// </div>
