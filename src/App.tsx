import { useEffect, useRef, useState } from 'react'
import SearchBox from './components/searchBox'
import SearchResult from './components/searchResult'
import ResultDetailed from './components/resultDetailed'
import './App.css'
import { escapeRegExp } from './components/util/util'
import { IPokemon } from "pokeapi-typescript"
import { GetPokemon, GetPokemonSpecies, MatchQuery, POKEMON_ENDPOINT } from "./components/util/PokeAPICache"
import LoadingSpinner from './components/loadingSpinner'

function App(props: {})
{
    const queryIndex = useRef(0)
    const searchDiv = useRef<HTMLDivElement>(null)

    const [searchResults, setSearchResults] = useState<JSX.Element[]>([])
    const [detailedResult, setDetailedResult] = useState<JSX.Element|null>(null)
    const [loading, setLoading] = useState(false)
    
    const queryPokeAPI = (query: string) => {
        setDetailedResult(null)
        setLoading(true)

        queryIndex.current += 1
        let thisQueryIndex = queryIndex.current

        query = escapeRegExp(query.toLowerCase().replaceAll(" ", "-").replaceAll(/:|\.|'/g, ''))
        if (query === "") // If no query...
        {
            setSearchResults([])
            setLoading(false)
            return
        }
        
        // query pokeapi for the pokemon
        MatchQuery(query, 30)
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
                setLoading(false)
            })
    }
    
    const detailHandler = (pokemon: IPokemon) => {
        setSearchResults([])
        setLoading(true)

        // Fetch species data from pokemon because
        // it is needed by <ResultDetailed />
        GetPokemonSpecies(pokemon.species.url)  // Else, fetch the data then put
            .then(species => {                   // the promise in the cache
                if (window.screen.width < 720)
                    searchDiv.current?.scrollIntoView()
                setDetailedResult(<ResultDetailed pokemon={pokemon} pkmnSpecies={species} />)
                setLoading(false)
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
                detailHandler(data)
            })
            .catch(() => console.log(`Failed to grab ${pkmn}`))
    }, [])

    useEffect(() => {
        document.body.classList.add("dark")
    }, [])

    return (
        <div className="App">
            <div className="search" ref={searchDiv}>
                <SearchBox keyUp={queryPokeAPI} />
                <div className="search__result-container">
                    {searchResults}
                </div>
                <div className="search__result-detailed-container">
                    <LoadingSpinner visible={loading}/>
                    {detailedResult}
                </div>
            </div>
        </div>
    )
}
//
export default App
