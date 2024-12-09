import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

function JoinCourseForm({ onClose, onCourseJoined }) {
  const [courseCode, setCourseCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleJoinCourse = async () => {
    if (!courseCode.trim()) {
      setError("El código del curso es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Buscar el curso con el código proporcionado
      const { data: course, error: fetchError } = await supabase
        .from("course")
        .select("id, name")
        .eq("course_code", courseCode)
        .single();

      if (fetchError || !course) {
        setError("No se encontró ningún curso con ese código.");
        setLoading(false);
        return;
      }

      // Registrar al usuario en el curso
      const userId = localStorage.getItem("user_id");

      const { error: joinError } = await supabase.from("course_records").insert([
        {
          course_id: course.id,
          user_id: userId,
          role_id: 1, // Por defecto "Alumno"
        },
      ]);

      if (joinError) {
        setError("Ocurrió un error al unirte al curso. Intenta de nuevo.");
        setLoading(false);
        return;
      }

      // Si se unió correctamente, actualizar los cursos y cerrar el modal
      onCourseJoined();
      onClose();
    } catch (err) {
      setError("Ocurrió un error inesperado. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-lg mx-auto raleway-font">
      <h2 className="text-xl font-bold anton-font mb-4 text-center">Unirse a un curso</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="mb-4">
        <label htmlFor="courseCode" className="block font-medium mb-1">
          Ingresa el código del curso
        </label>
        <input
          id="courseCode"
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Ingresa el código del curso de 9 caracteres"
        />
      </div>
      <button
        onClick={handleJoinCourse}
        className={`w-full px-4 py-2 text-white font-bold rounded ${
          loading ? "bg-gray-400 cursor-wait" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Uniéndote..." : "Unirse"}
      </button>
      <button
        onClick={onClose}
        className="mt-2 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cancelar
      </button>
    </div>
  );
}

export default JoinCourseForm;
