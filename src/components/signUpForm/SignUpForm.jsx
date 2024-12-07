import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Link, useNavigate  } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import bcrypt from "bcryptjs";

function SignUpForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleCloseForm = () => {
    navigate("/");
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
      // Generar el hash de la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password, salt);

      // Crear una copia de los datos del formulario con la contraseña hasheada
      const dataToSubmit = {
        ...formData,
        password: hashedPassword,
      };

      // Insertar el usuario en la tabla user_account
      const { error } = await supabase.from("user_account").insert([dataToSubmit]);

      if (error) {
        // Manejar errores específicos
        if (error.code === "23505" || error.message.includes("duplicate key value")) {
          throw new Error("Parece que el correo que estás intentando registrar ya está usado.");
        }
        throw new Error("Estamos teniendo dificultades, inténtelo más tarde.");
      }

      setSuccess(true);
      setFormData({
        first_name: "",
        last_name: "",
        birth_date: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#19253B] min-h-screen flex items-center justify-center raleway-font">
      <div
        className={`bg-[#33354A] p-8 rounded shadow-md w-full max-w-md ${
          loading ? "cursor-wait" : ""
        }`}
      >
        <div>
            <IoMdCloseCircle className="text-3xl text-white float-right cursor-pointer" onClick={handleCloseForm} />
            <h1 className="text-2xl text-white font-normal mb-4 anton-font tracking-wide">Crea tu cuenta</h1>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">¡Registro exitoso!</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-white">Nombre</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white">Apellido</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white">Fecha de Nacimiento</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
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
            <label className="block text-sm font-bold text-white">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
            className={`bg-blue-500 text-white px-4 py-2 rounded font-bold w-full hover:bg-blue-600 ${
              loading ? "cursor-wait" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          <div className="text-center mt-4">
            <p className="text-blue-300 font-bold cursor-pointer underline hover:text-blue-800">
              ¿Ya tienes una cuenta? Inicia Sesión
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
