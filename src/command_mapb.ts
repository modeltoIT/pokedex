import { State } from './state.js'

export async function commandMapB(state: State) {
	const { pokeAPI, prevLocationsURL } = state;

	if (!prevLocationsURL) {
		console.log("you're on the first page")
		
		return;
	}

	const { next, previous, results } = await pokeAPI.fetchLocations(prevLocationsURL);

	const locations = results.map(({ name }) => name).join('\n');

	state.nextLocationsURL = next;

	state.prevLocationsURL = previous;

	console.log(locations);
};
