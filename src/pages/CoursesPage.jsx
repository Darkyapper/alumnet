import React, { useState, useEffect } from "react";
import { supabase } from "../components/supabase/supabaseClient";
import CourseSelector from "../components/courseSelector/CourseSelector";
import CourseList from "../components/courseList/CourseList";
import JoinCourseForm from "../components/joinCourseForm/JoinCourseForm";
import CreateCourseForm from "../components/createCourseForm/CreateCourseForm";
import Modal from "../components/modal/Modal";

function CoursesPage() {
  const [selectedRole, setSelectedRole] = useState("student"); // "student" o "teacher"
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [selectedRole]);

  const fetchCourses = async () => {
    setLoading(true);
    const userId = localStorage.getItem("user_id");

    const roleName = selectedRole === "student" ? "Alumno" : "Profesor";
    const { data, error } = await supabase
      .from("course_members")
      .select("*")
      .eq("user_id", userId)
      .eq("role_name", roleName);

    if (!error) {
      setCourses(data);
    }
    setLoading(false);
  };

  const openJoinCourseForm = () => {
    setIsJoining(true);
  };

  const closeJoinCourseForm = () => {
    setIsJoining(false);
  };

  const openCreateCourseForm = () => {
    setIsCreating(true);
  };

  const closeCreateCourseForm = () => {
    setIsCreating(false);
  };

  return (
    <div className="raleway-font flex flex-col h-screen">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="anton-font text-2xl font-normal">Mis Cursos</h1>
        <div className="space-x-4">
          <button
            className="raleway-font bg-green-500 text-white px-4 py-2 rounded"
            onClick={openJoinCourseForm}
          >
            Unirse a un curso
          </button>
          <button
            className="raleway-font bg-blue-500 text-white px-4 py-2 rounded"
            onClick={openCreateCourseForm}
          >
            Crear un curso
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <CourseSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
        {loading ? (
          <p className="raleway-font text-center mt-4">Cargando cursos...</p>
        ) : (
          <CourseList courses={courses} />
        )}
      </div>

      {/* Modal para unirse a un curso */}
      {isJoining && (
        <Modal onClose={closeJoinCourseForm}>
          <JoinCourseForm onClose={closeJoinCourseForm} onCourseJoined={fetchCourses} />
        </Modal>
      )}

      {/* Modal para crear un curso */}
      {isCreating && (
        <Modal onClose={closeCreateCourseForm}>
          <CreateCourseForm onClose={closeCreateCourseForm} onCourseCreated={fetchCourses} />
        </Modal>
      )}
    </div>
  );
}

export default CoursesPage;
