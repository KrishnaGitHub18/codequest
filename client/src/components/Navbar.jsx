import React from "react";

function Navbar() {
  return (
    <nav className="bg-[#3B3B3B] border-b border-gray-700 px-6 py-3 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto">

        <div className="flex items-center gap-3">
          <img
            src="https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png"
            alt="logo"
            className="h-8 w-8 rounded-full border border-gray-600"
          />
          <span className="text-lg font-semibold text-gray-100">CodeHub</span>
        </div>

        <div className="flex gap-6 text-gray-300">
          <a
            href="#home"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#problems"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Problems
          </a>
          <a
            href="#profile"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
