import { useState } from 'react';
import PokemonSelector from '../components/PokemonSelector';

// Página de inicio donde se seleccionan dos Pokémon
export default function Home() 
{
	const [pokemon1, setPokemon1] = useState('001');
	const [pokemon2, setPokemon2] = useState('002');

	return (
	<div className="p-6 text-center">
		<h1 className="text-2xl font-bold mb-6">Fusión Pokémon</h1>

		<div className="flex justify-center gap-8">
		<PokemonSelector label="Pokémon 1" onSelect={setPokemon1} />
		<PokemonSelector label="Pokémon 2" onSelect={setPokemon2} />
		</div>
	</div>
	);
}
