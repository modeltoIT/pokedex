import { State } from './state.js'
import { isTypeArray, extractRelevantPokemonData } from './poke_api.js'

export async function commandInspect(state: State, ...pokemon: string[]) {
	const { pokeAPI, pokedex } = state;
	
	const pokemonName = pokemon[0];

	const catchedPokemon = pokedex.get(pokemonName);

	if (!catchedPokemon) {
		console.log('you have not caught that pokemon');

		return;
	}

	const pokemonData = extractRelevantPokemonData(catchedPokemon);

	let details = [];

	for (const [key, value] of Object.entries(pokemonData)){
		let characteristic = key[0].toUpperCase() + key.slice(1) + ': ';

		if (Array.isArray(value)) {
		 if (isTypeArray(value)) {
			characteristic += '\n' + value.map(type => `  - ${type.type.name}`).join('\n');
		 } else {
			characteristic += '\n' + value.map(stat => `  -${stat.stat.name}: ${stat.base_stat}`).join('\n');
		 }	
		} else {
			characteristic += value;	
		}

		details.push(characteristic);
	}

	console.log(details.join('\n'));
};
