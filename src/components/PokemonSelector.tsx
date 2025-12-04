import { useState } from 'react';

// Componente para seleccionar un Pokémon por su ID
interface PokemonSelectorProps 
{
	label: string;
	onSelect: (id: string) => void;
}

// Componente para seleccionar un Pokémon por su ID
export default function PokemonSelector({ label, onSelect }: PokemonSelectorProps) 
{
	const [selectedId, setSelectedId] = useState('001');

	// Generar IDs del 001 al 802 como strings con padding
	const pokemonIds = Array.from({ length: 802 }, (_, i) =>
	String(i + 1).padStart(3, '0')
	);

	// Manejar el cambio de selección
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => 
	{
		const newId = e.target.value;
		setSelectedId(newId);
		onSelect(newId);
	};

	return (
		<div className="flex flex-col items-center">
		<div className="w-[96px] h-[96px] border rounded bg-gray-50 flex items-center justify-center">
		<img src={`/src/assets/${selectedId}.png`} alt={`Pokemon ${selectedId}`} className="w-[96px] h-[96px]"/>
		</div>

		<label className="mt-2 text-sm font-semibold">{label}</label>

		<select className="mt-1 border rounded px-2 py-1" value={selectedId} onChange={handleChange}>
		{pokemonIds.map((id) => 
		(
			<option key={id} value={id}>
			#{id}
			</option>
		))}
		</select>
	</div>
	);
}
