import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

function CommentsModal({ post, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    fetchComments();
  }, [post]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("public_board_comments")
      .select("*")
      .eq("post_id", post.post_id)
      .order("comment_date", { ascending: false }); // Ordenar comentarios: más nuevo primero

    if (!error) {
      setComments(data);
    }
  };

  const handleAddComment = async () => {
    // Validar que el comentario no esté vacío
    if (!newComment.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }

    const userId = localStorage.getItem("user_id");

    const { error } = await supabase.from("public_reply").insert([
      {
        content: newComment,
        public_post_id: post.post_id,
        user_id: userId,
      },
    ]);

    if (!error) {
      setNewComment(""); // Limpiar el campo
      setError(null); // Limpiar el mensaje de error
      fetchComments(); // Actualizar la lista de comentarios
    } else {
      setError("Ocurrió un error al publicar el comentario. Intenta de nuevo.");
    }
  };

  return (
    <div className="raleway-font ">
      {/* Encabezado */}
      <h2 className="text-xl font-normal anton-font mb-4">Comentarios</h2>

      {/* Contenedor de comentarios con scroll */}
      <div className="overflow-y-auto max-h-64 border p-2 rounded mb-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.comment_id} className="border p-2 rounded mb-2">
              <p className="text-sm text-gray-600">{comment.author_name}</p>
              <p>{comment.comment_content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No hay comentarios aún.</p>
        )}
      </div>

      {/* Mensaje de error */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Entrada para nuevos comentarios */}
      <textarea
        placeholder="Escribe un comentario"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-2"
      ></textarea>
      <button
        onClick={handleAddComment}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Comentar
      </button>
    </div>
  );
}

export default CommentsModal;
