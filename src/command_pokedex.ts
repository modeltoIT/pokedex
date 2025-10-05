import { State } from './state.js'

export async function commandPokedex(state: State) {
	const { pokedex } = state;

	const pokemons = [];

	for (const [key, _] of pokedex) {
		pokemons.push(`  - ${key}`);
	}

	if (!pokemons.length) {
		console.log('Your Pokedex is empty')
	
		return;
	}

	console.log('Your Pokedex:\n' + pokemons.join('\n'));
};
