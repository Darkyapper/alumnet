import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../components/supabase/supabaseClient";
import Modal from "../components/modal/Modal";

function CourseAPage() {
  const { courseId } = useParams(); // Obtener el ID del curso desde la URL
  const [courseName, setCourseName] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal para confirmar la salida del curso
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseDetails();
    fetchAssignments();
  }, [courseId]);

  // Obtener detalles del curso
  const fetchCourseDetails = async () => {
    const { data, error } = await supabase
      .from("course_details")
      .select("course_name")
      .eq("course_id", courseId)
      .single();

    if (!error) {
      setCourseName(data.course_name);
    }
  };

  // Obtener las asignaciones del curso
  const fetchAssignments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("assignment_details")
      .select("*")
      .eq("course_id", courseId)
      .order("assignment_due_date", { ascending: true }); // Usa assignment_due_date
  
    if (error) {
      console.error("Error fetching assignments:", error);
    } else {
      setAssignments(data);
    }
    setLoading(false);
  };

  // Abandonar el curso
  const handleLeaveCourse = async () => {
    const userId = localStorage.getItem("user_id");

    const { error } = await supabase
      .from("course_records")
      .delete()
      .eq("course_id", courseId)
      .eq("user_id", userId);

    if (!error) {
      navigate("/courses"); // Redirigir al listado de cursos
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/courses")}
            className="text-gray-600 hover:text-gray-900"
          >
            Volver a Cursos
          </button>
          <h1 className="anton-font text-2xl font-normal">{courseName}</h1>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => navigate(`/private-board/${courseId}`)}
            className="raleway-font bg-blue-500 text-white px-4 py-2 rounded"
          >
            Ir al Tablero
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="raleway-font bg-red-500 text-white px-4 py-2 rounded"
          >
            Abandonar Curso
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        {loading ? (
          <p className="raleway-font text-center">Cargando asignaciones...</p>
        ) : assignments.length > 0 ? (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.assignment_id}
                className="bg-white shadow p-4 rounded"
              >
                <h3 className="text-lg font-normal anton-font">
                  {assignment.assignment_title}
                </h3>
                <p className="text-gray-700 raleway-font">
                  {assignment.assignment_description}
                </p>
                <p className="text-gray-500 text-sm">
                  Fecha de entrega:{" "}
                  {new Date(assignment.assignment_due_date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="raleway-font text-center text-gray-500">
            No hay asignaciones disponibles.
          </p>
        )}
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="raleway-font text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              ¿Estás seguro de que deseas abandonar este curso?
            </h2>
            <p className="text-gray-600 mb-6">
              Perderás acceso a todas las actividades y tableros de este curso.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleLeaveCourse}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Abandonar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CourseAPage;
