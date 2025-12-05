import PokemonSelector from '../components/PokemonSelector';
import pokeIcon from '../assets/poke.png';

export default function Home() 
{
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <table className="table-auto border-collapse bg-white shadow-lg">
        <tbody>
          {/* Fila con los dos selectores */}
          <tr>
            <td className="p-4 border border-gray-300 align-top">
              <PokemonSelector />
            </td>
            <td className="p-4 border border-gray-300 align-top">
              <PokemonSelector />
            </td>
          </tr>

          {/* Fila con el bloque de Pokémon Fusion */}
          <tr>
            <td colSpan={2} className="p-4 border border-gray-300 bg-gray-50">
              <div className="border border-gray-300 rounded-md p-4 text-center bg-white">

                {/* Título */}
                <h2 className="text-lg font-bold mb-4">Pokémon Fusion</h2>

                {/* Área reservada */}
                <div className="h-24 flex items-center justify-center text-gray-400 italic mb-4">
                  Próximamente…
                </div>

                {/* Botón FUSIÓN */}
                <button
                  className="
                    flex items-center justify-center gap-2
                    bg-red-500 hover:bg-red-600
                    text-white font-semibold
                    px-4 py-2 rounded-lg shadow
                    transition-all
                  "
                  onClick={() => { /* por ahora vacío */ }}
                >
                  <img src={pokeIcon} alt="Fusion Icon" className="w-6 h-6" />
                  Fusión
                </button>

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
