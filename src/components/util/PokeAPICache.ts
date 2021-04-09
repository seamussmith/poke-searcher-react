import { IPokemon, IPokemonSpecies, IEvolutionChain } from "pokeapi-typescript"

export const PokemonCache: Record<string, Promise<IPokemon>> = {}
export const SpeciesCache: Record<string, Promise<IPokemonSpecies>> = {}
export const EvolutionCache: Record<string, Promise<IEvolutionChain>> = {}

export const API_ENDPOINT = "https://pokeapi.co/api/v2"
export const POKEMON_ENDPOINT = API_ENDPOINT+"/pokemon/"
export const SPECIES_ENDPOINT = API_ENDPOINT+"/pokemon-species/"
export const EVOTREE_ENDPOINT = API_ENDPOINT+"/evolution/"

export async function GetPokemon(query: string)
{
    return PokemonCache[query] ?? (PokemonCache[query] = fetch(query).then(blob => blob.json()))
}

export async function GetPokemonSpecies(query: string)
{
    return SpeciesCache[query] ?? (SpeciesCache[query] = fetch(query).then(blob => blob.json()))
}
export async function GetEvolutionTree(query: string)
{
    return EvolutionCache[query] ?? (EvolutionCache[query] = fetch(query).then(blob => blob.json()))
}
