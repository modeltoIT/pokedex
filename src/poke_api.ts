import { Cache } from './pokecache.js'

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string | null;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};

export type PokemonHabitant = {
  pokemon: {
	name: string;
	url: string;
  }
}

export type ExploredArea = {
  location: Location;
  pokemon_encounters: PokemonHabitant[];
}

export type Pokemon = {
	name: string;
	base_experience: number;
	height: number;
	weight: number;
	stats: Stat[];
	types: Type[];
}

export type Stat = {
	base_stat: number;
	effort: number;
	stat: { 
		name: string;
		url: string;
	}
}

export type Type = {
	slot: number;
	type: {
		name: string;
		url: string;
	}
}

export function isType(value: unknown): value is Type {
	if (typeof value !== 'object' || value === null) return false;
	
	const v = value as any;

	return typeof v.slot === "number" && typeof v.type === 'object' && v.type !== null && typeof v.type.name === "string" && typeof v.type.url === "string";
}

export function isTypeArray(values: Stat[] | Type[]): values is Type[] {
	return values.every(value => isType(value));
}

export function extractRelevantPokemonData(data: Pokemon) {
	const { name, height, weight, stats, types } = data

	return { name, height, weight, stats, types };
}

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2/";
  private cache: Cache;

  constructor() {
	this.cache = new Cache(10000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
	const url = pageURL ? pageURL : PokeAPI.baseURL + 'location-area/';
	
	const cachedValue = this.cache.get<ShallowLocations>(url);

	if (cachedValue) return cachedValue;

	const response = await fetch(url);    		

    	if (!response.ok) {
    		throw new Error('Failed to fetch locations');
    	}

	const result = await response.json();

	this.cache.add<ShallowLocations>(url, result);

    	return result;
  }

  async fetchLocation(locationName: string): Promise<ExploredArea> {
	const url = PokeAPI.baseURL + 'location-area/' + locationName;
	  
	const cachedLocation = this.cache.get<ExploredArea>(url);

	if (cachedLocation) return cachedLocation;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Failed to fetch location');
	}

	const result = await response.json();

	this.cache.add<ExploredArea>(url, result);

	return result;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
	  const url = PokeAPI.baseURL + 'pokemon/' + pokemonName;
	  
	  const response = await fetch(url);

	  if (!response.ok) {
		  throw new Error('Failed to fetch pokemon data')
	  }

	  return await response.json();
  }
}

