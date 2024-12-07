import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LandingNavbar() {

  const navigate = useNavigate();

  const handleNavigateToLoginForm = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-[#34B5F6] text-white px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="anton-font text-2xl font-normal text-[#00032E]">
          <span>AlumNet</span>
        </div>

        {/* Call-to-Action Button */}
        <button className="transition ease-in-out raleway-font bg-[#FFF1E6] text-[#00032E] px-4 py-2 rounded-lg font-bold hover:bg-[#EDDFD4] hover:scale-105"
        onClick={handleNavigateToLoginForm}>
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
}

export default LandingNavbar;
