import { useEffect, useState } from 'react';
import { getPokemonInfoFromId } from "../utils/pokemon";
import type { PokemonTraits } from "../utils/pokemon";

function getSpriteFilename(value: string): string | null 
{
  const number = parseInt(value, 10);
  if (!isNaN(number) && number >= 1 && number <= 820) 
  {
    return number.toString().padStart(3, '0') + '.png';
  }
  return null;
}

type PokemonSelectorProps = 
{
  onChange?: (value: string) => void;
};

export default function PokemonSelector({ onChange }: PokemonSelectorProps) 
{
  const [inputValue, setInputValue] = useState<string>(() => String(Math.floor(Math.random() * 820) + 1));
  const [traits, setTraits] = useState<PokemonTraits | null>(null);

  const spriteFilename = getSpriteFilename(inputValue);
  const spritePath = spriteFilename ? `/src/assets/${spriteFilename}` : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) onChange(newValue);
  };

  useEffect(() => {
    async function fetchTraits() {
      const data = await getPokemonInfoFromId(inputValue);
      setTraits(data);
    }
    fetchTraits();
  }, [inputValue]);

  return (
    <table className="table-auto border-collapse border border-gray-400 bg-white shadow-md">
      <tbody>
        {/* Sprite */}
        <tr>
          <td className="border border-gray-300 px-4 py-2 text-center" colSpan={2}>
            {spritePath ? (
              <img
                src={spritePath}
                alt={`Pokémon ${inputValue}`}
                className="w-24 h-24 mx-auto"
              />
            ) : (
              <div className="w-24 h-24 mx-auto bg-gray-100 border rounded" />
            )}
          </td>
        </tr>

        {/* Info del Pokémon */}
        {traits && (
          <>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                Tipo:
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {traits.types.join(" / ")}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                Color:
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {traits.color}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                Forma:
              </td>
                <td className="border border-gray-300 px-4 py-2 text-left max-w-[150px] break-words">
                 {traits.bodyTrait}
                </td>

            </tr>
          </>
        )}

        {/* Input numérico */}
        <tr>
          <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
            (1–820):
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            <input
              type="number"
              min="1"
              max="820"
              value={inputValue}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded w-24 text-center"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
