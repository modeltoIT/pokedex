import { type Interface } from "node:readline";
import { PokeAPI, Pokemon } from "./poke_api.js";

export type State = {
	commands: Record<string, CLICommand>;
	rl: Interface;
	prevLocationsURL: string | null;
	nextLocationsURL?: string;
	pokeAPI: PokeAPI;
	pokedex: Map<string, Pokemon>;
}


export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};

