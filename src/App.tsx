import { useEffect, useRef, useState } from 'react'
import SearchBox from './components/searchBox'
import SearchResult from './components/searchResult'
import ResultDetailed from './components/resultDetailed'
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom"
import './App.css'
import { escapeRegExp } from './components/util/util'
import { IPokemon, IPokemonSpecies } from "pokeapi-typescript"
import { getPkmnByEndpoint, getPkmnByURL, MatchQuery, POKEMON_ENDPOINT } from "./components/util/PokeAPICache"
import LoadingSpinner from './components/loadingSpinner'

function App(props: {})
{
    const queryIndex = useRef(0)

    const [searchResults, setSearchResults] = useState<JSX.Element[]>([])
    const [detailedResult, setDetailedResult] = useState<JSX.Element|null>(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    const queryPokeAPI = (query: string) => {
        setDetailedResult(null)
        setLoading(true)
        history.push("/")

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
            .then(results => Promise.all(results.map(i => getPkmnByURL<IPokemon>(i.url))))
            .then(pokemonData => Promise.all(pokemonData.map(p => Promise.all([p, getPkmnByURL<IPokemonSpecies>(p.species.url)]))))
            .then((pokemonFullData) => {
                // Fix pop animations
                // if this is an earlier query, abort
                if (thisQueryIndex < queryIndex.current)
                    return
                setSearchResults([])
                // Map the search results into <SearchResult /> components and then display them
                setSearchResults(pokemonFullData.map(([pokemon, species]) =>
                    <SearchResult pokemon={pokemon} species={species} key={pokemon.name} />))
                setLoading(false)
            })
    }

    // useEffect(() => {
    //     // Handling pkmn query string variable
    //     let url_string = window.location.href
    //     let url = new URL(url_string)
    //     let pkmn = url.searchParams.get("pkmn")
    //     if (pkmn === null) // If variable pkmn is in the query string
    //         return

    //     getPkmnByEndpoint<IPokemon>("pokemon", pkmn)
    //         .then((data) => {
    //             // Pass it to detail handler to render the pokemon
    //             //detailHandler(data)
    //         })
    //         .catch(() => console.log(`Failed to grab ${pkmn}`))
    // }, [])

    useEffect(() => {
        document.body.classList.add("dark")
    }, [])

    return (
        <Router>
            <div className="App">
                <div className="search">
                    <div className="loading-container">
                        <LoadingSpinner visible={loading}/>
                    </div>
                    <SearchBox keyUp={queryPokeAPI} />
                    <Switch>
                        <Route path="/pokemon/:pkmn">
                            <div className="search__result-detailed-container">
                                <ResultDetailed />
                            </div>
                        </Route>
                        <Route path="/">
                            <div className="search__result-container">
                                {searchResults}
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>

    )
}
//
export default App
