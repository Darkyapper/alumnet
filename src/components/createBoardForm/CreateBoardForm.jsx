import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirección

function CreateBoardForm({ onBoardCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Instanciar el navegador

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const { data, error } = await supabase.from("topic").select("id, title");
    if (!error) {
      setTopics(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name.trim() || !description.trim() || !selectedTopic) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    try {
      // Crear el tablero
      const { data, error } = await supabase
        .from("public_board")
        .insert([
          {
            name,
            description,
            topic_id: selectedTopic,
          },
        ])
        .select("*")
        .single(); // Obtener el tablero recién creado

      if (error) throw new Error("Error al crear el tablero");

      // Inscribir al usuario al tablero
      const userId = localStorage.getItem("user_id");
      const { error: relationError } = await supabase.from("board_relation").insert([
        {
          public_board_id: data.id,
          user_id: userId,
        },
      ]);

      if (relationError) throw new Error("Error al inscribirte al tablero");

      // Limpiar campos
      setName("");
      setDescription("");
      setSelectedTopic("");

      // Redirigir a la página del tablero recién creado
      navigate(`/boards/${data.id}`);
    } catch (err) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-lg mx-auto raleway-font"
    >
      <h2 className="text-xl font-normal anton-font mb-4 text-center">Crear un Nuevo Tablero</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-1">
          Nombre del Tablero
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Ejemplo: Física Avanzada"
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
          placeholder="Describe el propósito del tablero..."
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="topic" className="block font-medium mb-1">
          Tema
        </label>
        <select
          id="topic"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Selecciona un tema</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
      </div>
      <p className="text-xs">Recuerda que los tableros que crees son públicos y cualquiera puede unirse, publicar y comentar en ellos.</p>
      <button
        type="submit"
        className={`mt-4 w-full px-4 py-2 text-white font-bold rounded ${
          loading ? "bg-gray-400 cursor-wait" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Creando..." : "Crear Tablero"}
      </button>
    </form>
  );
}

export default CreateBoardForm;
