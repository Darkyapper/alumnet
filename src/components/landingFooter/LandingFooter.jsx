import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function LandingFooter() {
  return (
    <footer className="bg-[#25273C] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
        {/* Sobre Nosotros */}
        <div>
          <h3 className="text-lg font-normal mb-4 anton-font">Sobre Nosotros</h3>
          <ul>
            <li><a href="/about" className="text-gray-400 hover:text-white raleway-font">Nuestra misión</a></li>
            <li><a href="/team" className="text-gray-400 hover:text-white raleway-font">El equipo</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white raleway-font">Contacto</a></li>
          </ul>
        </div>

        {/* Ayuda y Soporte */}
        <div>
          <h3 className="text-lg font-normal mb-4 anton-font">Ayuda y Soporte</h3>
          <ul>
            <li><a href="/help" className="text-gray-400 hover:text-white raleway-font">Centro de Ayuda</a></li>
            <li><a href="/faq" className="text-gray-400 hover:text-white raleway-font">Preguntas Frecuentes</a></li>
            <li><a href="/support" className="text-gray-400 hover:text-white raleway-font">Soporte Técnico</a></li>
          </ul>
        </div>

        {/* Términos y Privacidad */}
        <div>
          <h3 className="text-lg font-normal mb-4 anton-font">Términos y Privacidad</h3>
          <ul>
            <li><a href="/terms" className="text-gray-400 hover:text-white raleway-font">Términos de Uso</a></li>
            <li><a href="/privacy" className="text-gray-400 hover:text-white raleway-font">Política de Privacidad</a></li>
            <li><a href="/cookies" className="text-gray-400 hover:text-white raleway-font">Política de Cookies</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-normal anton-font mb-4">Social</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com/alumnet" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="https://twitter.com/alumnet" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="https://instagram.com/alumnet" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="https://linkedin.com/company/alumnet" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        <p  className="raleway-font">&copy; 2024 AlumNet. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default LandingFooter;
