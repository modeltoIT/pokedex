import { State } from './state.js'

export async function commandMap(state: State) {
	const { pokeAPI, nextLocationsURL } = state;

	const { next, previous, results } = await pokeAPI.fetchLocations(nextLocationsURL);

	const locations = results.map(({ name }) => name).join('\n');

	state.nextLocationsURL = next;

	state.prevLocationsURL = previous;

	console.log(locations);
};

