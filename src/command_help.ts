import { State } from './state.js'

export async function commandHelp(state: State) {
	console.log(`
Welcome to the Pokedex!
Usage:

help: Displays a help message
exit: Exit the Pokedex');`)

};
