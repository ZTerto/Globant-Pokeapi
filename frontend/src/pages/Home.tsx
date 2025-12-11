import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import poke from "../assets/poke.png";

type Fusion = 
{
  filename: string;
  prompt: string;
};

export default function Home() 
{
  const navigate = useNavigate();
  const [recentFusions, setRecentFusions] = useState<Fusion[]>([]);

  // Cargar fusiones recientes
  useEffect(() => {
    fetch("http://localhost:3001/recent-fusions")
      .then((res) => res.json())
      .then((data) => setRecentFusions(data))
      .catch((err) => console.error("Error fetching fusions:", err));
  }, []);

  const handleStart = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/fusioner");
    } else {
      navigate("/login");
    }
  };

  // Dividir en filas de 3
  const splitIntoRows = (arr: Fusion[]) => {
    const rows = [];
    for (let i = 0; i < arr.length; i += 3) {
      rows.push(arr.slice(i, i + 3));
    }
    return rows;
  };

  const fusionRows = splitIntoRows(recentFusions.slice(0, 12));

  return (
    <div className="flex flex-col items-center justify-center max-h-screen text-center p-8 gap-6">

      {/* 2 filas de imágenes arriba */}
      {fusionRows.slice(0, 2).map((row, i) => (
        <div key={`top-row-${i}`} className="flex gap-4">
          {row.map((fusion, j) => (
            <img
              key={`img-top-${i}-${j}`}
              src={`http://localhost:3001/images/${fusion.filename}`}
              alt={`Fusion ${j}`}
              className="w-32 h-32 object-contain rounded shadow"
            />
          ))}
        </div>
      ))}

      {/* Contenido central */}
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold mb-4">PokéAPI Project</h1>
        <p className="text-xl mb-6">Pokémon Fusion Generator and Stats</p>

        <img
          src={poke}
          alt="Poke ball"
          className="w-32 h-32 spin-slow mb-6 mx-auto"
        />

        <button
          onClick={handleStart}
          className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Start
        </button>
      </div>

      {/* 2 filas de imágenes debajo */}
      {fusionRows.slice(2, 4).map((row, i) => (
        <div key={`bottom-row-${i}`} className="flex gap-4">
          {row.map((fusion, j) => (
            <img
              key={`img-bottom-${i}-${j}`}
              src={`http://localhost:3001/images/${fusion.filename}`}
              alt={`Fusion ${j}`}
              className="w-32 h-32 object-contain rounded shadow"
            />
          ))}
        </div>
      ))}

    </div>
  );
}
