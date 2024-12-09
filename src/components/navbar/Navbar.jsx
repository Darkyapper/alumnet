import React from "react";
import { FaBell, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4">
      <div className="anton-font tracking-wider text-xl font-normal"></div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="raleway-font px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <FaBell className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500" />
        <FaUser className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500" />
      </div>
    </header>
  );
}

export default Navbar;
