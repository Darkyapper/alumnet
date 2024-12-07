import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import bcrypt from "bcryptjs";

function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleCloseForm = () => {
        navigate("/");
    };

    const handleNavigateToSignUpForm = () => {
        navigate("/sign-up");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Buscar al usuario por email
            const { data: users, error } = await supabase
                .from("user_account")
                .select("id, email, password")
                .eq("email", formData.email)
                .single(); // Traer solo un usuario

            if (error || !users) {
                throw new Error("Correo o contraseña incorrectos.");
            }

            // Verificar la contraseña con bcrypt
            const passwordMatch = await bcrypt.compare(formData.password, users.password);

            if (!passwordMatch) {
                throw new Error("Correo o contraseña incorrectos.");
            }

            // Guardar el ID del usuario en localStorage
            localStorage.setItem("user_id", users.id);

            // Redirigir al usuario a la página principal (ajústalo según tu lógica)
            window.location.href = "/";
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#19253B] min-h-screen flex items-center justify-center raleway-font">
            <div
                className={`bg-[#33354A] p-8 rounded shadow-md w-full max-w-md ${loading ? "cursor-wait" : ""
                    }`}
            >
                <div>
                    <IoMdCloseCircle className="text-3xl text-white float-right cursor-pointer" onClick={handleCloseForm} />
                    <h1 className="text-2xl text-white font-normal mb-4 anton-font tracking-wide">Inicia Sesión</h1>    
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-white">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-white">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded font-bold w-full hover:bg-blue-600 ${loading ? "cursor-wait" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Iniciando..." : "Iniciar Sesión"}
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-blue-300 font-bold cursor-pointer underline hover:text-blue-800"
                        onClick={handleNavigateToSignUpForm}>
                            ¿No tienes una cuenta? Regístrate
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
