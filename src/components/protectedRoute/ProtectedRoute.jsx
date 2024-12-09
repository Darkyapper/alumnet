import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Verificar si el usuario tiene sesión activa
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    // Si no hay sesión, redirigir a la landing page
    return <Navigate to="/" replace />;
  }

  // Si hay sesión, renderizar el contenido protegido
  return children;
}

export default ProtectedRoute;
