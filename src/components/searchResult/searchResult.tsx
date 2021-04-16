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
                <div className='search-result-name'>
                    <h2 className={pokeData.types[0].type.name}>{stylePokemonName(pokeData.name)}</h2>
                </div>
                
                <p className='search-result-types'>
                    <Type type={pokeData.types[0].type.name} key={pokeData.types[0].type.name}>{capitalize(pokeData.types[0].type.name)} </Type>
                    <Type type={pokeData.types[1]?.type.name} key={pokeData.types[1]?.type.name}>{capitalize(pokeData.types[1]?.type.name ?? "???")} </Type>
                </p>
            </div>
            
        </div>
    )
}

function Type(props: {
    type: string | null
    children: React.ReactNode
})
{
    return (
        <span className={`search-result__type ${props.type ?? "search-result__type--none"}`}>
            <span>{props.children}</span>
        </span>
    )
}

export default SearchResult
