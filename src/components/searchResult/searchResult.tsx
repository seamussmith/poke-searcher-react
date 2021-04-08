import React from 'react'
import {capitalize, stylePokemonName} from '../util/util'
import './searchResult.css'
import '../typeColorClasses/typeColorClasses.css'
import { IPokemon } from 'pokeapi-typescript'
import { InvokeQueryResult } from "../singletons/singletons"

type SearchResult_props = {
    pokeURL: string
    pokeData: IPokemon
    //detailHandler: (pkmnData: IPokemon) => void
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
        InvokeQueryResult.Invoke({ pokemon: this.props.pokeData })
        //this.props.detailHandler(this.props.pokeData)
    }
    render()
    {
        let pokeData = this.props.pokeData
        return (
            <div className='search-result' onClick={this.onClick}>
                <h2 className='search-result-name'>
                    <span className={pokeData.types[0].type.name}>{stylePokemonName(pokeData.name)}</span>
                </h2>
                <div>
                    <img
                    className="search-result__image nofilter"
                    src={pokeData.sprites.front_default}
                    alt={`${pokeData.name} sprite`}/>
                </div>
                <p className='search-result-types'>
                    {pokeData.types.map((i) =>
                        <span className={i.type.name}>{capitalize(i.type.name)} </span>
                    )}
                </p>
            </div>
        )
    }
}

export default SearchResult
