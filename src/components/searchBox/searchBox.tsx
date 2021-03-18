import React from 'react'
import './searchBox.css'

type SearchBox_props = {
    keyUp: (query: string) => void
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
        this.props.keyUp(event.currentTarget.value)
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
                onKeyUp={this.keyUpInput}/>
            </div>
        )
    }
}

export default SearchBox;
