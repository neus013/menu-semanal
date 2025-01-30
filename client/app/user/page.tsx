"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/Navbar";
import UserIcon from "../../components/UserIcon";
import MenuTable from "../../components/MenuTable";

const API_URL = "http://localhost:4000";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface Meal {
  type: string;
  plannedDish: {
    _id: string;
    name: string;
  } | null;
  actualDish: string | null;
}

interface Day {
  day: string;
  meals: Meal[];
}

interface Menu {
  _id: string;
  name: string;
  week: string;
  days: Day[];
  isDefault: boolean;
}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [menuData, setMenudata] = useState<Menu | null>(null);
  const router = useRouter();

  // Obtener semana actual
  const getMondayOfCurrentWeek = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(now.setDate(now.getDate() + diff));
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        
        // Obtener Usuario
        const UserRes = await axios.get<User>(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(UserRes.data);

        // Obtener menús del usuario
        const menuRes = await axios.get<Menu[]>(`${API_URL}/api/menus/${UserRes.data._id}`);
        const menus = menuRes.data;

        // Obtener fecha lunes de esta semana
        const currentMonday = getMondayOfCurrentWeek();

        // Obtener el menú de esta semana o el default
        const thisWeekMenu = menus.find(menu => menu.week && menu.week.startsWith(currentMonday));
        const defaultMenu = menus.find(menu => menu.isDefault);

        setMenudata(thisWeekMenu || defaultMenu || null);

      } catch (error) {
        console.error("Error obteniendo datos:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className="bg-gradient-light min-h-screen">
      {/* Barra lateral */}
      <Navbar />

      <div className="flex flex-col ml-64">
        {" "}
        {/* Ajusta el margen para que no se sobreponga con la barra lateral */}
        {/* Barra superior */}
        <header className="flex justify-end p-4">
          <UserIcon />
        </header>
        {/* Menú de la semana */}
        <section className="p-4">
          <h1 className="font-saira text-3xl p-8 mb-8">
            Menú d'aquesta setmana:
          </h1>
          {menuData ? (
            <MenuTable menuData={menuData} />
          ) : (
            <p className="font-saira text-gray-600">
              No hi ha menú disponible.
            </p>
          )}
          {/* Este componente será el que renderiza la tabla del menú */}
        </section>
      </div>
    </div>
  );
}
