import { State } from './state.js'

export async function commandCatch(state: State, ...pokemon: string[]) {
	const { pokeAPI, pokedex } = state;
	
	const pokemonName = pokemon[0].toLowerCase();

	const fetchedPokemon = await pokeAPI.fetchPokemon(pokemonName);

	console.log(`Throwing a Pokeball at ${pokemonName}...`)

	const chance = Math.min(fetchedPokemon.base_experience / 630, 0.95);

	if (chance <= Math.random()) {
		pokedex.set(pokemonName, { ...fetchedPokemon });

		console.log(`${pokemonName} was caught!`);
	} else {
		console.log(`${pokemonName} escaped!`);
	}
};
