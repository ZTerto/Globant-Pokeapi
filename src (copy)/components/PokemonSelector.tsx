import { useState } from 'react';

// Convierte a "xxx.png" si el valor es válido
function getSpriteFilename(value: string): string | null 
{
	const number = parseInt(value, 10);
	if (!isNaN(number) && number >= 1 && number <= 820) 
	{
		return number.toString().padStart(3, '0') + '.png';
	}
	return null;
}

// Componente para seleccionar y mostrar un Pokémon
export default function PokemonSelector() 
{
	const [inputValue, setInputValue] = useState<string>('1');
	const spriteFilename = getSpriteFilename(inputValue);

	let spritePath: string | null = null;
	if (spriteFilename) 
	{
		spritePath = `/src/assets/${spriteFilename}`;
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => 
	{
		setInputValue(e.target.value);
	};

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

      {/* Input numérico */}
      <tr>
        <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
          (1–820):
        </td>
        <td className="border border-gray-300 px-4 py-2 text-center">
          <input
            type="number"
            min="0"
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
