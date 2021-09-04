import { useEffect, useRef, useState } from 'react'
import SearchBox from './components/searchBox'
import SearchResult from './components/searchResult'
import ResultDetailed from './components/resultDetailed'
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory, useParams } from "react-router-dom"
import './App.css'
import { escapeRegExp } from './components/util/util'
import { IPokemon, IPokemonSpecies } from "pokeapi-typescript"
import { getPkmnByURL, MatchQuery } from "./components/util/PokeAPICache"
import LoadingSpinner from './components/loadingSpinner'

function App(props: {})
{
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <RealApp />
        </Router>
    )
}

function RealApp()
{
    const queryIndex = useRef(0)

    const [searchResults, setSearchResults] = useState<JSX.Element[]>([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    const queryPokeAPI = (query: string) => {
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
            .then((pokemon) => {
                pokemon.forEach(p => getPkmnByURL<IPokemonSpecies>(p.species.url))
                // Fix pop animations
                // if this is an earlier query, abort
                if (thisQueryIndex < queryIndex.current)
                    return
                setSearchResults([])
                // Map the search results into <SearchResult /> components and then display them
                setSearchResults(pokemon.map(p =>
                    <SearchResult pokemon={p} key={p.name} />))
                setLoading(false)
            })
    }

    useEffect(() => {
        document.body.classList.add("dark")
    }, [])

    return (
        <div className="App">
            <div className="search">
                <div className="loading-container">
                    <LoadingSpinner visible={loading}/>
                </div>
                <SearchBox keyUp={queryPokeAPI} />
                <Switch>
                    <Route path="/:id/:name/" exact>
                        <div className="search__result-detailed-container">
                            <ResultDetailed />
                        </div>
                    </Route>
                    <Route path="/:name/" exact>
                        <WackyRedirect />
                        <div className="search__result-detailed-container">
                            <LoadingSpinner visible/>
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
    )
}

function WackyRedirect()
{
    const params = useParams<{name:string}>()
    const history = useHistory()
    const [id, setId] = useState<number|null>(null)

    useEffect(() => {
        MatchQuery(params.name)
            .then(result => {
                const foundResult = result.find(e => e.name === params.name)
                if (foundResult === undefined)
                {
                    history.push("/")
                    return
                }
                setId(parseInt(foundResult!.url.split("/").slice(-2)[0]))
            })
    }, [params, history])

    if (id == null)
        return null

    return <Redirect to={`/${id}/${params.name}/`}/>
}
//
export default App
