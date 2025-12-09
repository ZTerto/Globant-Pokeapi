import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PokemonSelector from "../components/PokemonSelector";
import { getPokemonInfoFromId } from "../utils/pokemon";
import type { PokemonTraits } from "../utils/pokemon";
import pokeIcon from "../assets/poke.png";

export default function Fusioner() 
{
  const navigate = useNavigate();
  const [leftId, setLeftId] = useState<string>(String(Math.floor(Math.random() * 820) + 1));
  const [rightId, setRightId] = useState<string>(String(Math.floor(Math.random() * 820) + 1));
  const [isWorking, setIsWorking] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFusion = async () => 
  {
    if (isWorking) return;

    setIsWorking(true);
    setImageUrl(null);

    try 
    {
      const left = await getPokemonInfoFromId(leftId);
      const right = await getPokemonInfoFromId(rightId);

      if (!left || !right) 
      {
        console.error("Error fetching Pokémon info.");
        setIsWorking(false);
        return;
      }

      const prompt = generateFusionPrompt(left, right);
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
      setImageUrl(url);
      
    } 
    catch (error) 
    {
      console.error("Error during fusion:", error);
      setIsWorking(false);
    }
  };


  function generateFusionPrompt(left: PokemonTraits, right: PokemonTraits): string 
  {
    let bodyFusion: string;
    const typeFusion = `${left.types.join("/")} and ${right.types.join("/")}`;

    if (left.bodyTrait === right.bodyTrait) 
    {
      bodyFusion = left.bodyTrait;
    } 
    else 
    {
      bodyFusion = `${left.bodyTrait} and ${right.bodyTrait}`;
    }
    const colorFusion = `${left.color} and ${right.color}`;

    return `Create a new Pokémon fusion combining traits from ${capitalize(
      left.name
    )} and ${capitalize(right.name)}. It is a ${typeFusion}-type creature with ${bodyFusion} features and a ${colorFusion} color palette. Design it in anime style with a clean white background.`;
  }

  function capitalize(str: string): string 
  {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  let buttonClasses =
    "flex items-center justify-center gap-2 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all";
  let buttonText = "Fusion";
  let iconClasses = "w-6 h-6";

  if (isWorking) 
  {
    buttonClasses += " bg-gray-400 cursor-not-allowed";
    buttonText = "Working";
    iconClasses += " spin-slow";
  } else {
    buttonClasses += " bg-red-500 hover:bg-red-600";
  }

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
    <table className="table-auto border-collapse bg-white shadow-lg">
      <tbody>

        {/* Selectores */}
        <tr>
          <td className="p-4 border border-gray-300 align-top">
            <PokemonSelector onChange={setLeftId} />
          </td>
          <td className="p-4 border border-gray-300 align-top">
            <PokemonSelector onChange={setRightId} />
          </td>
        </tr>

        {/* Fusion y resultado */}
        <tr>
          <td colSpan={2} className="p-4 border border-gray-300 bg-gray-50">
            <div className="border border-gray-300 rounded-md p-4 text-center bg-white">
              <h2 className="text-lg font-bold mb-4">Pokemon Fusion</h2>

              <div className="h-64 flex items-center justify-center text-gray-400 italic mb-4">
                {/* Sin imagen y no trabajando */}
                {!isWorking && !imageUrl && (
                  <p className="text-gray-400 italic">Ready</p>
                )}

                {/* Imagen generada */}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Pokémon fusion"
                    className="max-h-64 rounded border"
                    onLoad={() => {
                      setTimeout(() => {
                        setIsWorking(false);
                      }, 3000);
                    }}
                  />
                )}
              </div>

              {/* Botones */}
              <div className="flex justify-center items-center gap-4">
                <button
                  disabled={isWorking}
                  className={buttonClasses}
                  onClick={handleFusion}
                >
                  <img src={pokeIcon} alt="Fusion Icon" className={iconClasses} />
                  {buttonText}
                </button>

                {imageUrl && (
                  <a
                    href={imageUrl}
                    download="fusion.png"
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Botón para volver al inicio */}
    <div className="mt-12">
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
      >
        ⬅ Back
      </button>
    </div>
  </div>
);
}
