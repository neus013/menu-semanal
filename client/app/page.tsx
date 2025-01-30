"use client";
import { useState } from "react";
import AccountModal from "../components/AccountModal";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="bg-gradient min-h-screen flex flex-col justify-center items-center p-8">
      <div className=" flex flex-col items-center justify-center bg-[#f4dbc6] rounded-2xl shadow-md p-8">
        <header className="text-center">
          <h1 className="font-shrikhand text-6xl text-black tracking-tight drop-shadow-m">
            Menú Setmanal
          </h1>
          <p className="font-saira text-lg text-gray-800 mt-4 font-thin">
            Planifica els teus menjars, estalvia temps i gaudeix de la teva
            setmana sense complicacions!
          </p>
        </header>

        <main className="flex flex-row items-center gap-8 p-6 pt-14">
          <button
            onClick={() => setIsLoginOpen(true)}
            className=" text-gray-900 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-[#f52891] transition"
          >
            Iniciar Sessió
          </button>
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="bg-[#f52891aa] text-gray-900 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-[#f52891] transition"
          >
            Registrar-se
          </button>
        </main>
      </div>

      <footer className="w-full absolute bottom-0 py-6 text-gray-300 text-center">
        <p>
          Creat per{" "}
          <a
            href="mailto:neus.gramunt@gmail.com"
            className="text-[#f3ae35] underline hover:text-[#f3ae35aa]"
          >
            neus.gramunt@gmail.com
          </a>
        </p>
      </footer>

      {isLoginOpen && (
        <AccountModal
          title="Iniciar Sessió"
          close={() => setIsLoginOpen(false)}
        />
      )}
      {isRegisterOpen && (
        <AccountModal
          title="Registrar-se"
          close={() => setIsRegisterOpen(false)}
        />
      )}
    </div>
  );
}
