import React, { useState } from 'react';
import Modal from 'react-modal';
import Post from './Post'; // Import your Post component
import { createPost } from '../../services/api';
import ImageUploader from './ImageUploader'; // Import your ImageUploader component

// Modal.setAppElement('#root'); // Set the root element for accessibility

function CreatePost(props) {
  const [formData, setFormData] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    // Include the image data in formData if needed
    const postData = { ...formData, picture: uploadedImage };
    console.log('posting: ',postData)
    const res = await createPost(props.userId, postData);
    if (res.status == 200){
        props.setPosts((prevState) => [...prevState, res.data]);
        // closeModal();
        props.onClose();
    }
    else{
        console.log('error creating post')
    }

  };

  return (
    <>
      {/* Modal for Creating a New Post */}
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        className="flex flex-col max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
          {/* Your existing form fields */}
          
          {/* ImageUploader component */}
          <ImageUploader onImageUpload={(image) => setUploadedImage(image)} />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Description
            </label>
            <input
              type="text"
              name="description"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Post
          </button>
          <button
            onClick={props.onClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default CreatePost;
