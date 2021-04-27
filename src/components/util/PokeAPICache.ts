import { IPokemon, IPokemonSpecies, IEvolutionChain, INamedApiResourceList, IAbility } from "pokeapi-typescript"

type s =
    IPokemon |
    IPokemonSpecies |
    IEvolutionChain |
    IAbility

export const APICache: Record<string, Promise<any>> = {}
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

export async function getPkmnByURL<T extends s>(query: string): Promise<T>
{
    return APICache[query] ?? (APICache[query] = fetch(query).then(blob => blob.json()))
}

export async function getPkmnByEndpoint<T>(endpoint: string, param: string): Promise<T>
{
    const query = `${API_ENDPOINT}/${endpoint}/${param}`
    return APICache[query] ?? (APICache[query] = fetch(query).then(blob => blob.json()))
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
