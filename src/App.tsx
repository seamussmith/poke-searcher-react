import React from 'react'
import SearchBox from './components/searchBox/searchBox'
import SearchResult from './components/searchResult/searchResult'
import ResultDetailed from './components/resultDetailed/resultDetailed'
import './App.css'
import { escapeRegExp } from './components/util/util'
import { IPokemon, INamedApiResourceList } from "pokeapi-typescript"
import { InvokeQueryResult } from "./components/singletons/singletons"
import { GetPokemon, GetPokemonSpecies, MatchQuery, POKEMON_ENDPOINT } from "./components/util/PokeAPICache"

type App_state = {
    // TODO: Replace generic JSX.Element with React component type
    searchResults: JSX.Element[]
    detailedResult: JSX.Element | null
}
type App_props = {}
class App extends React.Component<App_props, App_state>
{
    // PokeAPI Cache
    // <url, Promise<pokedata>>
    //private pokemonCache: Record<string, Promise<IPokemon>>
    //private speciesCache: Record<string, Promise<IPokemonSpecies>>
    // Number that prevents previous queries overriding the latest one
    private queryIndex: number
    constructor(props: App_props)
    {
        super(props)
        InvokeQueryResult.Subscribe((args) => this.detailHandler(args.pokemon))
        //this.pokemonCache = {}
        //this.speciesCache = {}
        this.queryIndex = 0
        this.state = {
            searchResults: [],
            detailedResult: null,
        }
        // this.this.this.this
        this.queryPokeAPI = this.queryPokeAPI.bind(this)
        this.detailHandler = this.detailHandler.bind(this)
    }
    // Function that queries PokeAPI and displays the results in this.state.searchResults
    queryPokeAPI(query: string)
    {
        this.setState({
            detailedResult: null
        })
        this.queryIndex += 1
        let thisQueryIndex = this.queryIndex
        query = escapeRegExp(query.toLowerCase().replaceAll(" ", "-").replaceAll(/:|\.|'/g, ''))
        if (query === "") // If no query...
        {
            // Reset the result container and do nothing else
            this.setState({
                searchResults: []
            })
            return
        }
        // query pokeapi for the pokemon
        MatchQuery(query, 27)
            .then(results => {
                // accumulate all the matches then fetch the pokemon
                Promise.all(results.map(i => GetPokemon(i.url)))
                    .then((pokemon: IPokemon[]) => {
                        // if this is an earlier query, abort
                        if (thisQueryIndex < this.queryIndex)
                            return
                        // set search results to empty array because that breaks the animations
                        this.setState({
                            searchResults: []
                        })
                        this.setState({
                            // Map the search results into <SearchResult /> components and then display them
                            searchResults: pokemon.map(
                                (e, i) => <SearchResult pokeData={e} />
                            )
                        })
                    })
            })
    }
    // Display the detailed information for a selected pokemon
    detailHandler(pkmnData: IPokemon)
    {
        this.setState({
            searchResults: [],
            detailedResult: <h1>Loading details....</h1>
        })
        // Fetch species data from pokemon because
        // it is needed by <ResultDetailed />
        GetPokemonSpecies(pkmnData.species.url)  // Else, fetch the data then put
            .then(species => {                   // the promise in the cache
                this.setState({
                   searchResults: [],
                   detailedResult: <ResultDetailed pokemon={pkmnData} pkmnSpecies={species} />
                })
            })
    }
    componentDidMount()
    {
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
    }
    render()
    {
        return (
            <div className="App">
                <div className="search">
                    <SearchBox keyUp={this.queryPokeAPI} />
                    <div className="search__result-container">
                        {this.state.searchResults}
                    </div>
                    <div className="search__result-detailed-container">
                        {this.state.detailedResult}
                    </div>
                </div>
            </div>
        )
    }
}

export default App
