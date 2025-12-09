import { useNavigate } from "react-router-dom";
import poke from "../assets/poke.png";

export default function Home() 
{
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-4xl font-bold mb-4">PokéAPI Project</h1>
      <p className="text-xl mb-6">Pokémon Fusion Generator and Stats</p>
      <img
        src={poke}
        alt="Poke ball"
        className="w-32 h-32 spin-slow mb-6"
       />
      <button
        onClick={() => navigate("/fusioner")}
        className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Start
      </button>
    </div>
  );
}
