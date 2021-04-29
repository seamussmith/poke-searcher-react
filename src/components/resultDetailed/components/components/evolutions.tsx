import { IChainLink, IEvolutionChain, IPokemon, IPokemonSpecies } from "pokeapi-typescript"
import React, { useContext, useEffect, useState } from "react"
import LoadingSpinner from "../../../loadingSpinner"
import SearchResult from "../../../searchResult"
import { getPkmnByURL } from "../../../util/PokeAPICache"
import { EvolutionsGrid } from "../styleComponents/evolutions"
import PokemonContext from "../../pokemonContext"

export function Evolutions(props: {})
{
    const [pokemonList, setPokemonList] = useState<IPokemon[]|null>(null)
    const { pokemon, species } = useContext(PokemonContext)

    // when the component mounts
    // componentDidMount
    useEffect(() => {
        getPkmnByURL<IEvolutionChain>(species.evolution_chain.url)
            .then(result => unwrapChain(result)) // vv Push default variants to the top of the list
            .then(pokemons => setPokemonList(pokemons.sort((a, b) => Number(b.is_default) - Number(a.is_default))))
    }, [species.evolution_chain.url])

    return (
        <EvolutionsGrid>
            {pokemonList?.map((pkmn) => 
                <SearchResult
                pokemon={pkmn}
                disabled={pokemon.name === pkmn.name}
                key={pkmn.name}/>)
                ?? <LoadingSpinner visible />}
        </EvolutionsGrid>
    )
}

async function unwrapChain(evoChain: IEvolutionChain)
{
    // each species named url
    let urls: string[] = []
    // stack of evolves_to properties
    let evoStack: IChainLink[] = []

    // push the first evolution onto the stack
    evoStack.push(evoChain.chain)
    // while the stack isnt empty
    while (evoStack.length !== 0)
    {
        // pop the first evolution off the evo stack
        let item = evoStack.pop()
        // push the evolution's species data into result
        urls.push(item!.species.url)
        // push all evolutions to the stack
        evoStack.push(...item!.evolves_to)
    }

    // Fetch all the pokemon species data
    let speciesEntries = await Promise.all(urls.map(url => getPkmnByURL<IPokemonSpecies>(url)))

    // *external screaming*
    // Fetch all the pokemon data
    let pokemonPromise = Promise.all(
        speciesEntries.map( // Each species has an array of varieties
            entry => entry.varieties.map(v => getPkmnByURL<IPokemon>(v.pokemon.url)) // Fetch each variety in the species
            ).flat()) // Flatten the array

    // Return the resulting pokemons
    return await pokemonPromise
}
