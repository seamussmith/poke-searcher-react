import React, { useEffect, useRef, useState } from 'react'
import SearchBox from './components/searchBox/searchBox'
import SearchResult from './components/searchResult/searchResult'
import ResultDetailed from './components/resultDetailed/resultDetailed'
import './App.css'
import { escapeRegExp } from './components/util/util'
import { IPokemon } from "pokeapi-typescript"
import { InvokeQueryResult } from "./components/singletons/singletons"
import { GetPokemon, GetPokemonSpecies, MatchQuery, POKEMON_ENDPOINT } from "./components/util/PokeAPICache"

function App(props: {})
{
    const queryIndex = useRef(0)
    
    const [searchResults, setSearchResults] = useState<JSX.Element[]>([])
    const [detailedResult, setDetailedResult] = useState<JSX.Element|null>(null)
    
    const queryPokeAPI = (query: string) => {
        setDetailedResult(null)

        queryIndex.current += 1
        let thisQueryIndex = queryIndex.current

        query = escapeRegExp(query.toLowerCase().replaceAll(" ", "-").replaceAll(/:|\.|'/g, ''))
        if (query === "") // If no query...
        {
            setSearchResults([])
            return
        }
        
        // query pokeapi for the pokemon
        MatchQuery(query, 27)
            // accumulate all the matches then fetch the pokemon
            .then(results => Promise.all(results.map(i => GetPokemon(i.url))))
            .then(pokemonData => Promise.all(pokemonData.map(p => Promise.all([p, GetPokemonSpecies(p.species.url)]))))
            .then((pokemonFullData) => {
                // Fix pop animations
                // if this is an earlier query, abort
                if (thisQueryIndex < queryIndex.current)
                    return
                setSearchResults([])
                // Map the search results into <SearchResult /> components and then display them
                setSearchResults(pokemonFullData.map(([pokemon, species]) =>
                    <SearchResult pokemon={pokemon} species={species} key={pokemon.name} onClick={pokemon => detailHandler(pokemon)}/>))
            })
    }
    
    const detailHandler = (pokemon: IPokemon) => {
        setSearchResults([])
        setDetailedResult(<h1>Loading details...</h1>)

        // Fetch species data from pokemon because
        // it is needed by <ResultDetailed />
        GetPokemonSpecies(pokemon.species.url)  // Else, fetch the data then put
            .then(species => {                   // the promise in the cache
                setDetailedResult(<ResultDetailed pokemon={pokemon} pkmnSpecies={species} />)
            })
    }

    useEffect(() => {
        // Handling pkmn query string variable
        let url_string = window.location.href
        let url = new URL(url_string)
        let pkmn = url.searchParams.get("pkmn")
        if (pkmn === null) // If variable pkmn is in the query string
            return

        GetPokemon(POKEMON_ENDPOINT+pkmn)
            .then((data) => {
                // Pass it to detail handler to render the pokemon
                InvokeQueryResult.Invoke({
                    pokemon: data
                })
            })
            .catch(() => console.log(`Failed to grab ${pkmn}`))
    }, [])

    return (
        <div className="App">
            <div className="search">
                <SearchBox keyUp={queryPokeAPI} />
                <div className="search__result-container">
                    {searchResults}
                </div>
                <div className="search__result-detailed-container">
                    {detailedResult}
                </div>
            </div>
        </div>
    )
}

export default App
