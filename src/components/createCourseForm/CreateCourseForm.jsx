import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

function CreateCourseForm({ onClose, onCourseCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateCourse = async () => {
    if (!name.trim() || !description.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    setError(null);

    const userId = localStorage.getItem("user_id");

    const { data, error } = await supabase
      .from("course")
      .insert([{ name, description }])
      .select("*")
      .single();

    if (!error && data) {
      const { error: roleError } = await supabase.from("course_records").insert([
        {
          course_id: data.id,
          user_id: userId,
          role_id: 2, // Por defecto "Profesor"
        },
      ]);

      if (!roleError) {
        setName("");
        setDescription("");
        onCourseCreated();
        onClose();
      } else {
        setError("Ocurrió un error al asignarte como profesor. Intenta de nuevo.");
      }
    } else {
      setError("Ocurrió un error al crear el curso. Intenta de nuevo.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-lg mx-auto raleway-font">
      <h2 className="text-xl font-bold anton-font mb-4 text-center">Crear un nuevo curso</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-1">
          Nombre del Curso
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Ejemplo: Introducción a Matemáticas"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-medium mb-1">
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Describe el propósito del curso..."
        ></textarea>
      </div>
      <button
        onClick={handleCreateCourse}
        className={`w-full px-4 py-2 text-white font-bold rounded ${
          loading ? "bg-gray-400 cursor-wait" : "bg-green-500 hover:bg-green-600"
        }`}
        disabled={loading}
      >
        {loading ? "Creando..." : "Crear Curso"}
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

export default CreateCourseForm;
