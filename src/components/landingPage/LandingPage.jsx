import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { FaChalkboardTeacher, FaTrophy } from "react-icons/fa";
import { MdTask } from "react-icons/md";

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
