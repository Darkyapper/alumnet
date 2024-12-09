import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "../components/supabase/supabaseClient";
import Modal from "../components/modal/Modal";
import MarkdownEditor from "../components/markdownEditor/MarkdownEditor";
import CommentsModal from "../components/commentsModal/CommentsModal";

function BoardFeedPage() {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [boardName, setBoardName] = useState("");
    const [posts, setPosts] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchBoardDetails();
        checkMembership();
        fetchPosts();
    }, [boardId]);

    // Obtener el nombre del tablero
    const fetchBoardDetails = async () => {
        const { data, error } = await supabase
            .from("public_board")
            .select("name")
            .eq("id", boardId)
            .single();

        if (!error) {
            setBoardName(data.name);
        }
    };

    // Verificar si el usuario pertenece al tablero
    const checkMembership = async () => {
        const userId = localStorage.getItem("user_id");
        const { data, error } = await supabase
            .from("board_relation")
            .select("*")
            .eq("public_board_id", boardId)
            .eq("user_id", userId)
            .single();

        setIsMember(!error && data !== null);
    };

    // Obtener los posts del tablero
    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("public_board_posts")
            .select("*")
            .eq("board_id", boardId)
            .order("post_date", { ascending: false });

        if (!error) {
            setPosts(data);
        }
        setLoading(false);
    };

    // Obtener los miembros del tablero
    const fetchMembers = async () => {
        const { data, error } = await supabase
            .from("public_board_members")
            .select("*")
            .eq("board_id", boardId);

        if (!error) {
            setMembers(data);
        }
    };

    const handleJoinBoard = async () => {
        const userId = localStorage.getItem("user_id");
      
        const { error } = await supabase.from("board_relation").insert([
          {
            public_board_id: boardId,
            user_id: userId,
          },
        ]);
      
        if (!error) {
          setIsMember(true);
          alert("¡Te has unido al tablero!");
        } else {
          console.error("Error al unirse al tablero:", error.message);
        }
      };
      

    // Salir del tablero
    const handleLeaveBoard = async () => {
        const userId = localStorage.getItem("user_id");
        const { error } = await supabase
            .from("board_relation")
            .delete()
            .eq("public_board_id", boardId)
            .eq("user_id", userId);

        if (!error) {
            setIsMember(false);
            navigate("/boards");
        }
    };

    const openCreatePostModal = () => {
        setIsCreatingPost(true);
    };

    const closeCreatePostModal = () => {
        setIsCreatingPost(false);
    };

    const openCommentsModal = (post) => {
        setSelectedPost(post);
    };

    const closeCommentsModal = () => {
        setSelectedPost(null);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <header className="bg-white shadow p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        className="raleway-font bg-gray-200 text-gray-600 px-4 py-2 rounded"
                        onClick={() => navigate("/boards")}
                    >
                        Regresar
                    </button>
                    <h1 className="anton-font text-2xl font-normal">{boardName}</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="raleway-font bg-gray-200 text-gray-600 px-4 py-2 rounded"
                        onClick={() => {
                            setShowMembersModal(true);
                            fetchMembers();
                        }}
                    >
                        Ver miembros
                    </button>
                    {isMember && (
                        <button
                            className="raleway-font bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => setShowLeaveModal(true)}
                        >
                            Salir del tablero
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
                {isMember ? (
                    <button
                        className="raleway-font bg-blue-500 text-white px-4 py-2 rounded mb-4"
                        onClick={openCreatePostModal}
                    >
                        Crear un nuevo post
                    </button>
                ) : (
                    <button
                        className="raleway-font bg-green-500 text-white px-4 py-2 rounded mb-4"
                        onClick={handleJoinBoard}
                    >
                        Unirse al tablero
                    </button>
                )}

                {loading ? (
                    <p className="raleway-font text-center">Cargando posts...</p>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div key={post.post_id} className="bg-white shadow p-4 rounded">
                                <h3 className="text-lg font-normal anton-font mb-2 tracking-wide">
                                    {post.post_title} por {post.author_name}
                                </h3>
                                <ReactMarkdown
                                    children={post.post_content}
                                    remarkPlugins={[remarkGfm]}
                                    className="prose"
                                />
                                <button
                                    className="raleway-font text-blue-500 underline"
                                    onClick={() => openCommentsModal(post)}
                                >
                                    Ver comentarios
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal para crear post */}
            {isCreatingPost && (
                <Modal onClose={closeCreatePostModal}>
                    <MarkdownEditor
                        boardId={boardId}
                        onClose={closeCreatePostModal}
                        onPostCreated={fetchPosts}
                    />
                </Modal>
            )}

            {/* Modal para comentarios */}
            {selectedPost && (
                <Modal onClose={closeCommentsModal}>
                    <CommentsModal post={selectedPost} />
                </Modal>
            )}

            {/* Modal para ver miembros */}
            {showMembersModal && (
                <Modal onClose={() => setShowMembersModal(false)}>
                    <h2 className="anton-font text-lg mb-4">Miembros del tablero</h2>
                    <div className="overflow-y-auto max-h-64">
                        {members.map((member) => (
                            <p key={member.user_id} className="border-b py-2">
                                {member.full_name} - {member.user_email}
                            </p>
                        ))}
                    </div>
                </Modal>
            )}

            {/* Modal para confirmar salida */}
            {showLeaveModal && (
                <Modal onClose={() => setShowLeaveModal(false)}>
                    <h2 className="anton-font text-lg mb-4">Confirmar salida</h2>
                    <p className="mb-4">¿Estás seguro de que deseas salir de este tablero?</p>
                    <div className="flex space-x-4">
                        <button
                            className="raleway-font bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            onClick={() => setShowLeaveModal(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="raleway-font bg-red-500 text-white px-4 py-2 rounded"
                            onClick={handleLeaveBoard}
                        >
                            Salir del tablero
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default BoardFeedPage;
