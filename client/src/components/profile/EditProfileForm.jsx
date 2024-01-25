import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { updateProfile } from "../../services/api";
import { updateProfileSuccess } from "../../actions/authActions";
import { useDispatch } from "react-redux";

const EditProfileForm = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log("user: ", user)
  const [formData, setFormData] = useState({ ...user });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const update = async () => {
      const res = await updateProfile(user._id,formData);
      if (res.status === 200) {
        console.log("Profile updated");
      } else {
        console.log("Error updating profile", res);
      }
    };
    update();
    // Close the modal
    onClose();

    // Update the user in the Redux store
    dispatch(updateProfileSuccess(formData));
    
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex flex-col max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Add your form fields here */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
          />
        </div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            maxLength={30}
            value={formData.location || ""}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
          />

          <input
            type="text"
            name="bio"
            placeholder="Bio"
            maxLength={100}
            value={formData.bio || ""}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
          />
          <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          maxLength={100}
          value={formData.occupation || ""}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
        />
        {/* Add more fields as needed */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
    </Modal>
  );
};

export default EditProfileForm;
