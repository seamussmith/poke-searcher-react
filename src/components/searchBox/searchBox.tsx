import React from 'react'
import './searchBox.css'

type SearchBox_props = {
    typeAheadHandler: (query: string) => void
}
type SearchBox_state = {}
class SearchBox extends React.Component<SearchBox_props, SearchBox_state>
{
    constructor(props: SearchBox_props)
    {
        super(props)
        this.state = {}
        this.keyUpInput = this.keyUpInput.bind(this)
    }
    keyUpInput(event: React.KeyboardEvent<HTMLInputElement>)
    {
        this.props.typeAheadHandler(event.currentTarget.value)
    }
    render()
    {
        return (
            <div className="search__inputs">
                <h1 className="search__title">PokeSearcher!</h1>
                <input
                type="text"
                className="search__input"
                placeholder="Search for a Pokemon!"
                spellCheck={false}
                onKeyUp={this.keyUpInput}/>
            </div>
        )
    }
}

export default SearchBox;
