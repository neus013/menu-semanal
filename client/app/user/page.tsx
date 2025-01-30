"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = "http://localhost:4000";

interface User {
    _id: string;
    name: string;
    email: string;
}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await axios.get<User>(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">
        {user ? `Hola, ${user.name}!` : "Cargando..."}
      </h1>
    </div>
  );
}
