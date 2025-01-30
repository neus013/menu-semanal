// src/components/Navbar.tsx
import React from "react";
import Link from "next/link";
import { FaHome, FaList, FaShoppingCart, FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-[#f4dbc6] bg-opacity-10 w-56 h-screen shadow-lg fixed top-0 left-0 z-10">
      <div className="flex flex-col items-start p-6">
        <h2 className="font-shrikhand text-3xl text-[#a41e63] mb-16">
          MenuApp
        </h2>
        <nav className="flex flex-col space-y-4">
          <Link
            href="/home"
            className="font-saira text-base text-[#f4dbc6] hover:text-[#a41e63] flex items-center pb-4"
          >
            {" "}
            · Inici
          </Link>
          <Link
            href="/menus"
            className="font-saira text-base text-[#f4dbc6] hover:text-[#a41e63] flex items-center pb-4"
          >
            {" "}
            · Menú
          </Link>
          <Link
            href="/shopping-list"
            className="font-saira text-base text-[#f4dbc6] hover:text-[#a41e63] flex items-center pb-4"
          >
            {" "}
            · Llista de la compra
          </Link>
          <Link
            href="/profile"
            className="font-saira text-base text-[#f4dbc6] hover:text-[#a41e63] flex items-center pb-4"
          >
            {" "}
            · Perfil
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
