import React from "react";

function LandingNavbar() {
  return (
    <nav className="bg-[#34B5F6] text-white px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="anton-font text-2xl font-normal text-[#00032E]">
          <span>AlumNet</span>
        </div>

        {/* Call-to-Action Button */}
        <button className="raleway-font bg-white text-[#00032E] px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
}

export default LandingNavbar;
