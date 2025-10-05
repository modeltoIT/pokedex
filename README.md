# Pokedex CLI (TypeScript)

Tiny terminal Pokedex REPL program. It queries the PokeAPI and lets you explore, catch, and inspect pokemons using CLI.

## Quickstart

**Requirements:** Node.js 18+

```
# install
npm i

# run
npm run dev
```

When you see the prompt:

```
Pokedex >
```

type `help` to list commands.

## Commands

| Command     | Description |
|-------------|-------------|
| `help`      | Display a help message with all commands. |
| `map`       | Show the **next 20** location areas in the Pokémon world. |
| `mapb`      | Show the **previous 20** location areas (paginate backward). |
| `explore <area>` | List **all Pokemon** that inhabit a given area. |
| `catch <pokemon>` | Try to catch a Pokemon (success is probabilistic); adds to your Pokédex on success. |
| `inspect <pokemon>` | Show **details** for a Pokemon **already in your Pokedex**. |
| `pokedex`   | List **all Pokemon you’ve caught** so far. |
| `exit`      | Exit the Pokedex. |

> Flow tip: `map` → copy an area → `explore <area>` → `catch <pokemon>` → `inspect <pokemon>` → `pokedex`.

Data source: [PokeAPI](https://pokeapi.co/)
