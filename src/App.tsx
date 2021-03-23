import React from 'react'
import SearchBox from './components/searchBox/searchBox'
import SearchResult from './components/searchResult/searchResult'
import ResultDetailed from './components/resultDetailed/resultDetailed'
import './App.css'
import { escapeRegExp } from './components/util/util'

type App_state = {
    // TODO: Replace generic JSX.Element with React component type
    searchResults: JSX.Element[]
    detailedResult: JSX.Element | null
}
type App_props = {
    pokemonIndex: any
}
class App extends React.Component<App_props, App_state>
{
    // PokeAPI Cache
    // <url, Promise<pokedata>>
    private pokemonCache: Record<string, Promise<any>>
    private speciesCache: Record<string, Promise<any>>
    // Number that prevents previous queries overriding the latest one
    private queryIndex: number
    constructor(props: App_props)
    {
        super(props)
        this.pokemonCache = {}
        this.speciesCache = {}
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
        this.queryIndex = this.queryIndex+1
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
        let matches = this.props.pokemonIndex.results.filter((i: any) => i.name.match(query) !== null).slice(0, 24)
        Promise.all(matches.map(
            // Return the promise for the query if cached
            (i:any) => (this.pokemonCache[i.url] ?? (this.pokemonCache[i.url] = fetch(i.url).then(blob => blob.json())))
                                            // Else, fetch the pokemon needed and put the Promise in the query cache
        )).then(result => {
            if (thisQueryIndex < this.queryIndex)
                return
            // set search results to empty array because that breaks the animations
            this.setState({
                searchResults: []
            })
            this.setState({
                // Map the search results into <SearchResult /> components and then display them
                searchResults: result.map(
                    (e, i) => <SearchResult pokeURL={matches[i].url} pokeData={e} detailHandler={this.detailHandler}/>
                )
            })
        })
    }
    // Display the detailed information for a selected pokemon
    detailHandler(pkmnData: any)
    {
        this.setState({
            searchResults: [],
            detailedResult: <h1>Loading details....</h1>
        });
        // Fetch species data from pokemon because
        // it is needed by <ResultDetailed />
        (this.speciesCache[pkmnData.species.url] ?? // If cached, use that data
        (this.speciesCache[pkmnData.species.url] = fetch(pkmnData.species.url).then(blob => blob.json())))  // Else, fetch the data then put
            .then(species => {                                                                              // the promise in the cache
                this.setState({
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
        if (pkmn !== null) // If variable pkmn is in the query string
        {
            // Grab the pokemon
            let pokeIndex = this.props.pokemonIndex.results.find((i: any) => i.name === pkmn)
            // if it exists...
            if (pokeIndex !== undefined && pokeIndex !== null)
            {
                // Grab the pokemon data
                (this.pokemonCache[pokeIndex.url] = fetch(pokeIndex.url).then(blob => blob.json()))
                    .then((data) => {
                        // Pass it to detail handler to render the pokemon
                        this.detailHandler(data)
                    })
            }
        }
    }
    render()
    {
        return (
            <div className="App">
                <div className="search">
                    <SearchBox keyUp={this.queryPokeAPI} />
                    <div className="search__result-container">
                        {this.state.detailedResult}
                        {this.state.searchResults}
                    </div>
                </div>
            </div>
        )
    }
}

export default App
