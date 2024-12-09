import React from "react";
import { useNavigate } from "react-router-dom";

function CourseList({ courses }) {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`); // Redirige al contenido del curso
  };

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div
          key={course.course_id}
          onClick={() => handleCourseClick(course.course_id)}
          className="bg-white shadow p-4 rounded cursor-pointer hover:bg-gray-200 transition"
        >
          <h3 className="text-lg font-normal anton-font">{course.course_name}</h3>
          <p className="text-gray-700 raleway-font">{course.course_description}</p>
        </div>
      ))}
    </div>
  );
}

export default CourseList;
