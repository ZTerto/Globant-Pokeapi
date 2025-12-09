export type PokemonTraits = 
{
  name: string;
  types: string[];
  color: string;
  bodyTrait: string;
};

export async function getPokemonInfoFromId(id: string): Promise<PokemonTraits | null> 
{
  try 
  {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!res.ok) return null;
    const species = await res.json();

    const types = await getTypesFromPokemonId(id);
    const eggGroups: string[] = species.egg_groups.map((g: { name: string }) => g.name);
    const bodyTrait =
      eggGroups.map(describeEggGroup).filter((t): t is string => Boolean(t))[0] || "a unique form";

    return {
      name: species.name,
      types,
      color: species.color.name,
      bodyTrait,
    };
  } 
  catch (error) 
  {
    console.error("Error fetching Pokémon info:", error);
    return null;
  }
}

async function getTypesFromPokemonId(id: string): Promise<string[]> 
{
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return data.types.map((t: any) => t.type.name);
}

function describeEggGroup(group: string): string | null 
{
  const traits: Record<string, string> = {
    humanoid: "a humanoid body",
    amorphous: "an abstract, shapeless form",
    monster: "a bulky and powerful physique",
    dragon: "a serpentine or mythical appearance",
    field: "a terrestrial animal-like body",
    bug: "an insectoid body",
    water1: "an aquatic form adapted for swimming",
    flying: "a lightweight body with wings",
    fairy: "a small and elegant appearance",
    plant: "a body with plant-like features",
    mineral: "a crystalline or rock-like form",
    ditto: "a gelatinous, flexible shape",
  };
  return traits[group] || null;
}
