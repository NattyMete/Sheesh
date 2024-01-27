import React from "react";

const NavBar = () => {
    return (
        <nav class="bg-gray-800 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <div class="text-white text-xl font-bold">YourLogo</div>

    <ul class="flex space-x-4">
      <li><a href="#" class="text-white hover:text-gray-300">Home</a></li>
      <li><a href="#" class="text-white hover:text-gray-300">Posts</a></li>
      <li><a href="#" class="text-white hover:text-gray-300">About</a></li>
      <li><a href="#" class="text-white hover:text-gray-300">Contact</a></li>
    </ul>

    <div class="flex items-center space-x-4">
      <a href="#" class="text-white hover:text-gray-300">Login</a>
      <a href="#" class="text-white hover:text-gray-300">Sign Up</a>
      <div class="w-8 h-8 rounded-full bg-white"></div>
    </div>
  </div>
</nav>

    );
    }

export default NavBar;