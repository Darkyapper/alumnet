import React from "react";

function Feed() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Tableros o Actividades */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl anton-font tracking-wider font-normal mb-4">Mis Tableros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-500 raleway-font text-white p-4 rounded-lg text-center">
              <h3 className="font-bold">Matemáticas</h3>
              <p>Proyectos y ejercicios de álgebra</p>
            </div>
            <div className="bg-green-500 raleway-font text-white p-4 rounded-lg text-center">
              <h3 className="font-bold">Historia</h3>
              <p>Foro de discusión histórica</p>
            </div>
            <div className="bg-purple-500 raleway-font text-white p-4 rounded-lg text-center">
              <h3 className="font-bold">Ciencias</h3>
              <p>Experimentos y debates científicos</p>
            </div>
          </div>
        </div>

        {/* Actividades Recientes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl anton-font font-normal tracking-wider mb-4">Actividades Recientes</h2>
          <ul className="space-y-4 raleway-font">
            <li className="flex items-center space-x-4">
              <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <p>
                  <span className="font-bold">Matemáticas:</span> Nueva tarea sobre ecuaciones cuadráticas.
                </p>
                <p className="text-sm text-gray-500">Hace 2 horas</p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-green-500 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                H
              </div>
              <div>
                <p>
                  <span className="font-bold">Historia:</span> Participa en el foro sobre la Segunda Guerra Mundial.
                </p>
                <p className="text-sm text-gray-500">Hace 5 horas</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Feed;
