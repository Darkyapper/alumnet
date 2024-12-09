import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Modal({ children, onClose }) {
  // Cerrar el modal al presionar la tecla Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Cerrar el modal al hacer clic fuera del contenido
  const handleClickOutside = (e) => {
    if (e.target.id === "modal-background") {
      onClose();
    }
  };

  return (
    <div
      id="modal-background"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-lg">
        {/* Botón de cerrar */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>
        {/* Contenido del modal */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
