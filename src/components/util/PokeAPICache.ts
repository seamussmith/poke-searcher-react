import { IPokemon, IPokemonSpecies, IEvolutionChain } from "pokeapi-typescript"

export let PokemonCache: Record<string, Promise<IPokemon>> = {}
export let SpeciesCache: Record<string, Promise<IPokemonSpecies>> = {}
export let EvolutionCache: Record<string, Promise<IEvolutionChain>> = {}

const API_ENDPOINT = "https://pokeapi.co/api/v2"
const POKEMON_ENDPOINT = API_ENDPOINT+"/pokemon/"
export async function GetPokemon(query: string)
{
    const fullQuery = POKEMON_ENDPOINT + query
    return PokemonCache[fullQuery] ?? (PokemonCache[fullQuery] = fetch(fullQuery).then(blob => blob.json()))
}

const SPECIES_ENDPOINT = API_ENDPOINT+"/pokemon-species/"
export async function GetPokemonSpecies(query: string)
{
    const fullQuery = SPECIES_ENDPOINT + query
    return SpeciesCache[fullQuery] ?? (SpeciesCache[fullQuery] = fetch(fullQuery).then(blob => blob.json()))
}
const EVOTREE_ENDPOINT = API_ENDPOINT+"/evolution/"
export async function GetEvolutionTree(query: string)
{
    const fullQuery = EVOTREE_ENDPOINT + query
    return EvolutionCache[fullQuery] ?? (EvolutionCache[fullQuery] = fetch(fullQuery).then(blob => blob.json()))
}
