import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import poke from "../assets/poke.png";

type Fusion = {
  filename: string;
};

export default function Home() {
  const navigate = useNavigate();
  const [fusions, setFusions] = useState<Fusion[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/recent-fusions")
      .then((res) => res.json())
      .then((data) => setFusions(data))
      .catch((err) => console.error("Failed to fetch recent fusions:", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 space-y-10">
      
      {/* Cuadrícula superior (2 filas de 3) */}
      <div className="grid grid-cols-3 gap-4">
        {fusions.slice(0, 6).map((fusion, index) => (
          <img
            key={index}
            src={`http://localhost:3001/images/${fusion.filename}`}
            alt={`Fusion ${index + 1}`}
            className="w-32 h-32 border rounded shadow"
          />
        ))}
      </div>

      {/* Contenido central */}
      <div>
        <h1 className="text-4xl font-bold mb-4">PokéAPI Project</h1>
        <p className="text-xl mb-6">Pokémon Fusion Generator and Stats</p>
        <img
          src={poke}
          alt="Poke ball"
          className="w-32 h-32 spin-slow mb-6 mx-auto"
        />
        <button
          onClick={() => navigate("/fusioner")}
          className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Start
        </button>
      </div>

      {/* Cuadrícula inferior (2 filas de 3) */}
      <div className="grid grid-cols-3 gap-4">
        {fusions.slice(6, 12).map((fusion, index) => (
          <img
            key={index + 6}
            src={`http://localhost:3001/images/${fusion.filename}`}
            alt={`Fusion ${index + 7}`}
            className="w-32 h-32 border rounded shadow"
          />
        ))}
      </div>
    </div>
  );
}
