import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

function MarkdownEditor({ boardId, onClose, onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleCreatePost = async () => {
    // Validar que el título y el contenido no estén vacíos
    if (!title.trim()) {
      setError("El título no puede estar vacío.");
      return;
    }

    if (!content.trim()) {
      setError("El contenido no puede estar vacío.");
      return;
    }

    const userId = localStorage.getItem("user_id");

    const { error } = await supabase.from("public_post").insert([
      {
        title,
        content,
        public_board_id: boardId,
        user_id: userId,
      },
    ]);

    if (!error) {
      onPostCreated();
      onClose();
    } else {
      setError("Ocurrió un error al crear el post. Intenta de nuevo.");
    }
  };

  return (
    <div className="raleway-font">
      <h2 className="text-xl font-normal mb-4 anton-font">Crear un nuevo post</h2>
      
      {error && <p className="text-red-500 mb-2">{error}</p>} {/* Mostrar mensaje de error */}

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded"
      />

      <p className="text-sm">Los post utilizan el formato Markdown para poderse visualizar</p>
      <a href="https://markdown.es/sintaxis-markdown/"><p className="text-sm underline text-blue-800">Consulta el manual de sitaxis Markdown aquí</p></a>

      <textarea
        placeholder="Escribe tu contenido en Markdown"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-40 px-3 mt-2 py-2 border rounded"
      ></textarea>

      <button
        onClick={handleCreatePost}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Publicar
      </button>
    </div>
  );
}

export default MarkdownEditor;
