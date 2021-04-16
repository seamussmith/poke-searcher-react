import React from 'react'
import {capitalize, stylePokemonName} from '../util/util'
import './searchResult.css'
import '../typeColorClasses/typeColorClasses.css'
import { IPokemon, IPokemonSpecies } from 'pokeapi-typescript'

function SearchResult(props: {
    pokemon: IPokemon
    species?: IPokemonSpecies
    onClick: (pokemon: IPokemon) => void
    disabled?: boolean
})
{
    const pokeData = props.pokemon
    const onClick = () => {
        if (props.disabled)
            return
        props.onClick(pokeData)
    }
    return (
        <div className={`${props.disabled ? "search-result--disabled":""} search-result`} onClick={onClick}>
            <div className="search-result__img-container">
                <img
                className="search-result__image nofilter"
                src={pokeData.sprites.front_default}
                alt={`${pokeData.name} sprite`}/>
            </div>

            <div className="search-result__info-container">
                <h2 className='search-result-name'>
                    <span className={pokeData.types[0].type.name}>{stylePokemonName(pokeData.name)}</span>
                </h2>
                
                <p className='search-result-types'>
                    {pokeData.types.map((i) =>
                        <span className={i.type.name} key={i.type.name}>{capitalize(i.type.name)} </span>
                    )}
                </p>
            </div>
            
        </div>
    )
}

export default SearchResult
