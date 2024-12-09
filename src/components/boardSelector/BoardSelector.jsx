import React from "react";

function BoardSelector({ selectedOption, onOptionChange }) {
  return (
    <div className="bg-gray-100 border-b p-4 flex space-x-4">
      <button
        className={`px-4 py-2 rounded raleway-font ${
          selectedOption === "myBoards" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
        }`}
        onClick={() => onOptionChange("myBoards")}
      >
        Mis Tableros
      </button>
      <button
        className={`px-4 py-2 rounded raleway-font ${
          selectedOption === "searchBoards" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
        }`}
        onClick={() => onOptionChange("searchBoards")}
      >
        Buscar Tableros
      </button>
      <button
        className={`px-4 py-2 rounded raleway-font ${
          selectedOption === "createBoard" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
        }`}
        onClick={() => onOptionChange("createBoard")}
      >
        Crear Tablero
      </button>
    </div>
  );
}

export default BoardSelector;
