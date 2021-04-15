import React from 'react'
import {capitalize, stylePokemonName} from '../util/util'
import './searchResult.css'
import '../typeColorClasses/typeColorClasses.css'
import { IPokemon } from 'pokeapi-typescript'
import { InvokeQueryResult } from "../singletons/singletons"

function SearchResult(props: {
    pokeData: IPokemon
})
{
    const onClick = () => {
        window.scrollTo(0, 0)
        InvokeQueryResult.Invoke({ pokemon: props.pokeData })
    }
    let pokeData = props.pokeData
    return (
        <div className='search-result' onClick={onClick}>
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

export default SearchResult
