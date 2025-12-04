import PokemonSelector from '../components/PokemonSelector';

export default function Home() 
{
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <table className="table-auto border-collapse bg-white shadow-lg">
        <tbody>
          <tr>
            <td className="p-4 border border-gray-300 align-top">
              <PokemonSelector/>
            </td>
            <td className="p-4 border border-gray-300 align-top">
              <PokemonSelector/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
