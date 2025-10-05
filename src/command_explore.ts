import { State } from './state.js'

export async function commandExplore(state: State, ...area: string[]) {
	const { pokeAPI } = state;
	
	const location = area[0];

	const { pokemon_encounters } = await pokeAPI.fetchLocation(location);

	const pokemonNameList = pokemon_encounters.map(({ pokemon }) => pokemon.name).join('\n');

	console.log(`Exploring ${location}...\n` + pokemonNameList);
};

