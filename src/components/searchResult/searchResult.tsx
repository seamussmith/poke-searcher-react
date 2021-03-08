import React from 'react'
import {capitalize, stylePokemonName} from '../util/util'
import './searchResult.css'
import '../typeColorClasses/typeColorClasses.css'

type SearchResult_props = {
    pokeURL: string
    pokeData: any
    detailHandler: (pkmnData: any) => void
}
class SearchResult extends React.Component<SearchResult_props, {}>
{
    constructor(props: SearchResult_props)
    {
        super(props)
        this.onClick = this.onClick.bind(this)
    }
    onClick()
    {
        this.props.detailHandler(this.props.pokeData)
    }
    render()
    {
        let pokeData = this.props.pokeData
        return (
            <div className='search__result' onClick={this.onClick}>
                <h2 className='search__result-name'>
                    <span className={pokeData.types[0].type.name}>{stylePokemonName(pokeData.name)}</span>
                </h2>
                <div>
                    <img
                    className="nofilter"
                    src={pokeData.sprites.front_default}
                    alt={`${pokeData.name} sprite`}/>
                </div>
                <p className='search__result-types'>
                    <span className={pokeData.types[0].type.name}>{capitalize(pokeData.types[0].type.name)} </span>
                    <span className={(pokeData.types[1]?.type.name ?? "")}>{capitalize(pokeData.types[1]?.type.name ?? "")}</span>
                </p>
            </div>
        )
    }
}

export default SearchResult
