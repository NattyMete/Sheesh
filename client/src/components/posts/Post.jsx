import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../services/api";

function Post(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(props.userId);
            setUser(user);
        }
        fetchUser();
    }, []);

    return (
    <div class="bg-white shadow-md rounded-md p-6 my-4 relative">
        <div class="absolute top-0 right-0 p-2 bg-gray-800 text-white rounded-md">
        <img
            src={user.profilePicture}
            alt="Author"
            class="w-8 h-8 rounded-full mr-2"
        />
        <span class="text-gray-700">{`${user.firstName} ${user.lastName}`}</span>
        </div>
        {props.post.picturePath && <img
        src={props.post.picturePath}
        alt="Post Image"
        class="w-full mb-4 rounded-md"
        />}
        <p class="text-gray-600 mb-4">{props.post.description}</p>

        <button class="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">
        Like
        </button>
        <textarea
        placeholder="Add a comment..."
        class="w-full px-4 py-2 rounded-md mb-4"
        ></textarea>
    </div>
    );
}
export default Post;