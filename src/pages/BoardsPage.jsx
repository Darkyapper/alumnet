import React, { useState, useEffect } from "react";
import { supabase } from "../components/supabase/supabaseClient";
import BoardSelector from "../components/boardSelector/BoardSelector";
import BoardList from "../components/boardList/BoardList";

function BoardsPage() {
  const [selectedOption, setSelectedOption] = useState("myBoards");
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedOption === "myBoards") {
      fetchMyBoards();
    } else if (selectedOption === "searchBoards") {
      fetchPublicBoards();
    }
  }, [selectedOption]);

  const fetchMyBoards = async () => {
    setLoading(true);
    const userId = localStorage.getItem("user_id");

    const { data, error } = await supabase
      .from("board_relation")
      .select(`
        public_board (
          id,
          name,
          description,
          topic_id
        )
      `)
      .eq("user_id", userId);

    if (!error) {
      // Mapeamos los datos de `public_board` con la vista `public_board_details`
      const boardsData = data.map(async (relation) => {
        const board = relation.public_board;
        const details = await supabase
          .from("public_board_details")
          .select("*")
          .eq("board_id", board.id)
          .single();
        return details.data;
      });

      // Resolvemos las promesas para obtener los datos completos
      const resolvedBoards = await Promise.all(boardsData);
      setBoards(resolvedBoards);
    }
    setLoading(false);
  };

  const fetchPublicBoards = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("public_board_details").select("*");

    if (!error) {
      setBoards(data);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col h-screen">
        <BoardSelector
          selectedOption={selectedOption}
          onOptionChange={setSelectedOption}
        />
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {loading && <p className="raleway-font text-center mt-4">Cargando...</p>}
          {!loading && selectedOption === "myBoards" && <BoardList boards={boards} />}
          {!loading && selectedOption === "searchBoards" && <BoardList boards={boards} />}
          {selectedOption === "createBoard" && (
            <div className="p-6">
              <p className="text-center">Formulario para crear un nuevo tablero (próximamente)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardsPage;
