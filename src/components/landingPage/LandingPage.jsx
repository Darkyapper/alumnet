import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { FaChalkboardTeacher, FaTrophy, FaLightbulb } from "react-icons/fa";
import { MdTask, MdDevices } from "react-icons/md";
import { SiOpenai } from "react-icons/si";

function LandingPage() {

    return (
        <div className="bg-[#25273C]">
            {/* Hero Section */}
            <section className="bg-[#34B5F6] text-[#00032E] py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-normal mb-4 anton-font">Bienvenido a AlumNet</h1>
                    <p className="text-lg mb-6 raleway-font">
                        Da un salto hacia el aprendizaje colaborativo y efectivo.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-white text-[#00032E] px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
                            Registrate Ahora
                        </button>
                        <button className="bg-[#E95F3C] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#D95230]">
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-normal text-white anton-font text-center mb-10">¿Por qué elegir AlumNet?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#37B4F4] text-[#00032E] shadow-lg p-6 rounded-lg text-center">
                            <FaChalkboardTeacher className="text-6xl mb-4 justify-self-center" />
                            <h3 className="text-2xl font-bold mb-2">Tableros Interactivos</h3>
                            <p>Colabora con estudiantes y maestros en espacios dinámicos y temáticos tanto públicos como privados.</p>
                        </div>
                        <div className="bg-[#37B4F4] text-[#00032E] shadow-lg p-6 rounded-lg text-center">
                            <FaTrophy className="text-6xl mb-4 justify-self-center" />
                            <h3 className="text-2xl font-bold mb-2">Aprendizaje Dinamico</h3>
                            <p>Aprenda con un metodo de enseñanza que hará de la experiencia divertida y con un aprendizaje a su ritmo</p>
                        </div>
                        <div className="bg-[#37B4F4] text-[#00032E] shadow-lg p-6 rounded-lg text-center">
                            <MdTask className="text-6xl mb-4 justify-self-center" />
                            <h3 className="text-2xl font-bold mb-2">Gestión de Tareas</h3>
                            <p>Asigna y organiza tareas fácilmente en un entorno educativo eficaz y privado para sus alumnos.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collaborative Learning Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-normal text-[#00032E] anton-font text-center mb-10">
            Aprendizaje Colaborativo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-lg raleway-font text-[#00032E]">
                AlumNet fomenta el trabajo en equipo con tableros interactivos
                donde los estudiantes pueden colaborar en tiempo real, compartir
                ideas y desarrollar proyectos de manera conjunta.
              </p>
            </div>
            <div className="flex justify-center">
              <FaLightbulb className="text-9xl text-[#34B5F6]" />
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent Learning Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-normal text-white anton-font text-center mb-10">
            Aprendizaje Inteligente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <SiOpenai className="text-9xl text-[#34B5F6]" />
            </div>
            <div>
              <p className="text-lg raleway-font text-white">
                Con nuestro modelo de IA, AlumNet personaliza el aprendizaje
                para que cada estudiante pueda avanzar a su propio ritmo. La IA
                analiza el progreso y adapta los recursos para maximizar el
                rendimiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Always Accessible Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-normal text-[#00032E] anton-font text-center mb-10">
            Recursos Siempre Accesibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-lg raleway-font text-[#00032E]">
                Accede a recursos educativos desde cualquier dispositivo,
                cuando los necesites. AlumNet está diseñado para estar siempre
                a tu alcance, facilitando el aprendizaje continuo.
              </p>
            </div>
            <div className="flex justify-center">
              <MdDevices className="text-9xl text-[#34B5F6]" />
            </div>
          </div>
        </div>
      </section>


            {/* Call-to-Action Section */}
            <section className="bg-blue-500 text-white py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-normal anton-font mb-4">¿Listo para unirte?</h2>
                    <p className="text-lg mb-6 raleway-font">Regístrate ahora y empieza a crear, colaborar y aprender.</p>
                    <button className="raleway-font bg-white text-blue-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
                        Regístrate Gratis
                    </button>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
