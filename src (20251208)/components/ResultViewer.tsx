import { useState } from "react";
import { getPokemonInfoFromId } from "../utils/pokemon";
import type { PokemonTraits } from "../utils/pokemon";

type ResultViewerProps = {
  leftId: string;
  rightId: string;
};

// Componente para mostrar el resultado de la fusión de Pokémon
export default function ResultViewer({ leftId, rightId }: ResultViewerProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Maneja la generación de la imagen de fusión
  async function handleFusion(leftId: string, rightId: string) {
    setLoading(true);
    setImageUrl(null);

    try {
      const left = await getPokemonInfoFromId(leftId);
      const right = await getPokemonInfoFromId(rightId);

      if (!left || !right) {
        console.error("Error fetching Pokémon data.");
        setLoading(false);
        return;
      }

      const prompt = generateFusionPrompt(left, right);
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

      setImageUrl(url);
    } catch (error) {
      console.error("Error generating fusion:", error);
    } finally {
      setLoading(false);
    }
  }

  // Genera el prompt para la fusión de dos Pokémon
  function generateFusionPrompt(left: PokemonTraits, right: PokemonTraits): string {
    const typeFusion = `${left.types.join("/")} and ${right.types.join("/")}`;
    const bodyFusion =
      left.bodyTrait === right.bodyTrait
        ? left.bodyTrait
        : `${left.bodyTrait} and ${right.bodyTrait}`;
    const colorFusion = `${left.color} and ${right.color}`;

    return `Create a new Pokémon fusion combining traits from ${capitalize(
      left.name
    )} and ${capitalize(right.name)}. It is a ${typeFusion}-type creature with ${bodyFusion} features and a ${colorFusion} color palette. Design it in anime style with a clean white background.`;
  }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="flex flex-col items-center">
      <button
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        onClick={() => handleFusion(leftId, rightId)}
      >
      </button>
      {loading && <p className="mt-4"></p>}
      {imageUrl && 
      (
        <img
          src={imageUrl}
          alt="Fusión Pokémon"
          className="mt-4 w-64 h-auto border rounded"
        />
      )}
    </div>
  );
}
