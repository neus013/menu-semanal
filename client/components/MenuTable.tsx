// src/components/MenuTable.tsx
import React from "react";

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

interface MenuTableProps {
  menuData: Menu;
}

export default function MenuTable({ menuData }: MenuTableProps) {
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <h2 className="font-shrikhand text-xl text-[#f52891]">{menuData.name}</h2>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-[#f3ae35] text-white">
            <th className="border border-gray-300 px-4 py-2">Día</th>
            <th className="border border-gray-300 px-4 py-2">Comidas</th>
          </tr>
        </thead>
        <tbody>
          {menuData.days.map((day) => (
            <tr key={day.day} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{day.day}</td>
              <td className="border border-gray-300 px-4 py-2">
                {day.meals.map((meal, index) => (
                  <div key={index}>
                    <strong>{meal.type}:</strong>{" "}
                    {meal.plannedDish
                      ? meal.plannedDish.name
                      : meal.actualDish || "Sin plato"}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}