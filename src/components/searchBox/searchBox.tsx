import React from 'react'
import { InvokeQueryResult } from "../singletons/singletons"
import { capitalize } from "../util/util"
import './searchBox.css'

type SearchBox_props = {
    keyUp: (query: string) => void
}
type SearchBox_state = {
    query: string
}
class SearchBox extends React.Component<SearchBox_props, SearchBox_state>
{
    constructor(props: SearchBox_props)
    {
        super(props)
        this.state = {
            query: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onQueryComplete = this.onQueryComplete.bind(this)
        InvokeQueryResult.Subscribe((args) => this.onQueryComplete(args.pokemon.name))
    }
    onQueryComplete(pkmnName: string)
    {
        this.setState({
            query: capitalize(pkmnName)
        })
    }
    onChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.props.keyUp(event.currentTarget.value)
        this.setState({
            query: event.currentTarget.value
        })
    }
    render()
    {
        return (
            <div className="search-box">
                <h1 className="search-box__title">PokeSearcher!</h1>
                <input
                type="text"
                className="search-box__input"
                placeholder="Search for a Pokemon!"
                spellCheck={false}
                value={this.state.query}
                onChange={this.onChange}/>
            </div>
        )
    }
}

export default SearchBox;
