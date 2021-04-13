import { IPokemon, IPokemonSpecies, IEvolutionChain, INamedApiResourceList } from "pokeapi-typescript"

export const PokemonCache: Record<string, Promise<IPokemon>> = {}
export const SpeciesCache: Record<string, Promise<IPokemonSpecies>> = {}
export const EvolutionCache: Record<string, Promise<IEvolutionChain>> = {}
export let PokeList: INamedApiResourceList<IPokemon>|null = null

const indexListFetchJob =
    (async function(){
        PokeList = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=9999")
                    .then(blob => blob.json())
    })()

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

export async function MatchQuery(query: string, limit = -1)
{
    await indexListFetchJob // Wait until the index list is ready
    let results = PokeList!.results.filter((i) => i.name.match(query) !== null)
    if (limit > 0)
    {
        results = results.slice(0, limit)
    }
    return results
}
