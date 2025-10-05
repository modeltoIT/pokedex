import { createInterface } from "node:readline";
import { State, CLICommand } from './state.js'
import { PokeAPI, Pokemon } from './poke_api.js'

import { commandExit } from './command_exit.js'
import { commandHelp } from './command_help.js'
import { commandMap } from './command_map.js'
import { commandMapB } from './command_mapb.js'
import { commandExplore } from './command_explore.js'
import { commandCatch } from './command_catch.js'
import { commandInspect } from './command_inspect.js'
import { commandPokedex } from './command_pokedex.js'


export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
	name: "help",
	description: "Displays a help message",
	callback: commandHelp,
    },
    map: {
	name: "map",
	description: "Shows 20 location areas in the Pokemon world",
	callback: commandMap,
    },
    mapb: {
	name: "mapb",
	description: "Shows previous 20 location areas in the Pokemon world",
	callback: commandMapB,
    },
    explore: {
	name: "explore",
	description: "Shows all pokemons that inhabit a given area",
	callback: commandExplore,
    },
    catch: {
	name: "catch",
	description: "Tries to catch a pokemon with probability to succeed",
	callback: commandCatch,
    },
    inspect: {
	name: "inspect",
	description: "Shows the details about pokemon in your pokedex",
	callback: commandInspect,
    },
    pokedex: {
	name: "pokedex",
	description: "Shows list consisting of all pokemons in your pokedex",
	callback: commandPokedex,
    },

  }
}



export function initState(): State {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: 'Pokedex > '
	});

	const commands = getCommands();

	return { rl, commands, prevLocationsURL: null, pokeAPI: new PokeAPI(), pokedex: new Map<string, Pokemon>() };
}
