import { State } from './state.js'

export async function commandHelp(state: State) {
	const { commands } = state;

	let details = 'Welcome to the Pokedex!\nUsage:\n';

	for (const value of Object.values(commands)) {
		details += `\n${value.name}: ${value.description}`;
	}

	console.log(details);
};
