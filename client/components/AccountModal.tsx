"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AccountModal({ title, close }: { title: string; close: () => void }){
    const [formData, setFormData] = useState({email: "", password: ""});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const API_URL = "http://localhost:4000";

    const handleSubmit = async () => {
      try {
        if (title === "Iniciar Sessió") {
          // Lógica para iniciar sesión
          console.log(process.env.NEXT_PUBLIC_API_URL);
          const res = await axios.post(
            `${API_URL}/api/users/login`,
            formData
          );
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            router.push("/user");
          }
        } else if (title === "Registrar-se") {
          // Lógica para registrarse
          const res = await axios.post(
            `${API_URL}/api/users/register`,
            formData
          );
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            router.push("/user");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      alert(
        title === "Iniciar Sessió"
          ? "Error al iniciar sessió, Si us plau, revisa les credencials. " + error
          : "Error al registrar-se, Si us plau, intenta-ho de nou."
      )};
    };

    const handleGoogleLogin = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/auth/google`);
            if (res.data.success) {
                router.push("user");
            }
        } catch (error) {
            console.error("Error con Google Login:", error);
            alert("Error al iniciar sessió amb Google, prova d'iniciar sessió manualment.");
        }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-2">
          {title === "Iniciar Sessió"
            ? "Accedeix amb el teu compte:"
            : "Crea un compte per continuar:"}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mt-4"
        >
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f52891] focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Contrasenya"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f52891] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#f52891] text-white py-2 rounded-md hover:bg-[#f52891cc] transition shadow-md"
          >
            {title === "Iniciar Sessió" ? "Iniciar sessió" : "Registrar-se"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-2 text-gray-500">o</div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-[#7c3aed] text-white py-2 px-4 rounded-md mt-4 shadow-md hover:bg-[#7c3aedcc] transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />{" "}
          Inicia sessió amb Google
        </button>

        <button
          onClick={close}
          className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-slate-400 transition"
        >
          Tanca
        </button>
      </div>
    </div>
  );
}
