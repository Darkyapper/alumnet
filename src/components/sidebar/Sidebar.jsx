import React from "react";
import { FaHome, FaUser, FaCog, FaBell, FaTable, FaClipboardList } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import { PiBooksFill  } from "react-icons/pi";

function Sidebar() {
  return (
    <aside className="bg-[#25273C] text-white w-64 flex flex-col">
      <div className="px-6 py-4 text-2xl tracking-wider anton-font font-normal text-center border-b border-gray-700">
        AlumNet
      </div>
      <nav className="raleway-font flex-1 px-4 py-4 space-y-4">
        <a
          href="#"
          className="flex items-center space-x-2 text-lg font-medium hover:bg-gray-700 p-3 rounded"
        >
          <FaHome />
          <span>Inicio</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-lg font-medium hover:bg-gray-700 p-3 rounded"
        >
          <FaTable />
          <span>Mis Tableros</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-lg font-medium hover:bg-gray-700 p-3 rounded"
        >
          <MdClass  />
          <span>Mis Cursos</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-lg font-medium hover:bg-gray-700 p-3 rounded"
        >
          <FaClipboardList />
          <span>Actividades</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-lg font-medium hover:bg-gray-700 p-3 rounded"
        >
          <PiBooksFill  />
          <span>Recursos</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-lg font-medium hover:bg-gray-700 p-3 rounded"
        >
          <FaUser />
          <span>Perfil</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-lg font-medium hover:bg-gray-700 p-3 rounded"
        >
          <FaCog />
          <span>Ajustes</span>
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
