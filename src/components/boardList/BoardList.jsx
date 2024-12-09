import React from "react";
import { useNavigate } from "react-router-dom";

function BoardList({ boards }) {
  const navigate = useNavigate();

  const handleBoardClick = (boardId) => {
    navigate(`/boards/${boardId}`); // Navegar a la página del tablero
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {boards.map((board) => (
        <div
          key={board.board_id}
          className="bg-white shadow rounded p-4 cursor-pointer hover:bg-gray-100"
          onClick={() => handleBoardClick(board.board_id)} // Llama a la función al hacer clic
        >
          <h3 className="text-xl font-normal anton-font mb-2">{board.board_name}</h3>
          <p className="text-gray-600 raleway-font mb-2">{board.board_description}</p>
          <span className="text-sm raleway-font text-blue-500">Tema: {board.topic_name}</span>
        </div>
      ))}
    </div>
  );
}

export default BoardList;
