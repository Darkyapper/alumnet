import React from "react";

function CourseSelector({ selectedRole, onRoleChange }) {
  return (
    <div className="flex justify-center mb-4 space-x-4">
      <button
        className={`px-4 py-2 rounded ${
          selectedRole === "student" ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
        onClick={() => onRoleChange("student")}
      >
        Como Alumno
      </button>
      <button
        className={`px-4 py-2 rounded ${
          selectedRole === "teacher" ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
        onClick={() => onRoleChange("teacher")}
      >
        Como Profesor
      </button>
    </div>
  );
}

export default CourseSelector;
