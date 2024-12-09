import React, { useState, useEffect } from "react";
import { supabase } from "../components/supabase/supabaseClient";

function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("assignment_details")
      .select("*")
      .order("assignment_due_date", { ascending: true });

    if (!error) {
      setAssignments(data);
    }
    setLoading(false);
  };

  const today = new Date();

  const pendingAssignments = assignments.filter(
    (assignment) => new Date(assignment.assignment_due_date) >= today
  );

  const overdueAssignments = assignments.filter(
    (assignment) => new Date(assignment.assignment_due_date) < today
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6 raleway-font">
      <h1 className="text-2xl font-normal anton-font text-center mb-6">Asignaciones</h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando asignaciones...</p>
      ) : (
        <>
          {/* Asignaciones Pendientes */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Asignaciones Pendientes</h2>
            {pendingAssignments.length > 0 ? (
              <div className="space-y-4">
                {pendingAssignments.map((assignment) => (
                  <div
                    key={assignment.assignment_id}
                    className="bg-white p-4 rounded shadow hover:bg-gray-50 transition"
                  >
                    <h3 className="text-lg font-normal anton-font">
                      {assignment.assignment_title}
                    </h3>
                    <p className="text-gray-700">{assignment.assignment_description}</p>
                    <p className="text-sm text-gray-500">
                      Fecha de entrega:{" "}
                      {new Date(assignment.assignment_due_date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No tienes asignaciones pendientes.</p>
            )}
          </div>

          {/* Asignaciones Vencidas */}
          <div>
            <h2 className="text-xl font-bold text-red-600 mb-4">Asignaciones Vencidas</h2>
            {overdueAssignments.length > 0 ? (
              <div className="space-y-4">
                {overdueAssignments.map((assignment) => (
                  <div
                    key={assignment.assignment_id}
                    className="bg-white p-4 rounded shadow hover:bg-gray-50 transition"
                  >
                    <h3 className="text-lg font-normal anton-font">
                      {assignment.assignment_title}
                    </h3>
                    <p className="text-gray-700">{assignment.assignment_description}</p>
                    <p className="text-sm text-gray-500">
                      Fecha de entrega:{" "}
                      {new Date(assignment.assignment_due_date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No tienes asignaciones vencidas.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AssignmentsPage;
