import React from 'react'
import {capitalize, stylePokemonName} from '../util/util'
import './index.css'
import '../typeColorClasses/typeColorClasses.css'
import { IPokemon, IPokemonSpecies } from 'pokeapi-typescript'
import { Link } from "react-router-dom"

function SearchResult(props: {
    pokemon: IPokemon
    species?: IPokemonSpecies
    disabled?: boolean
})
{
    const pokeData = props.pokemon
    return (
        <Link to={`/${props.pokemon.id}/${props.pokemon.name}`} className={`${props.disabled ? "search-result--disabled":""} search-result`}>
            <div className="search-result__img-container">
                <img
                className="search-result__image nofilter"
                src={pokeData.sprites.front_default}
                alt={`${pokeData.name} sprite`}/>
            </div>

            <div className="search-result__info-container">
                <div className='search-result__name-container'>
                    <h2 className={`search-result__name ${pokeData.types[0].type.name}`}>{stylePokemonName(pokeData.name)}</h2>
                </div>
                
                <p className='search-result__type-container'>
                    <Type type={pokeData.types[0].type.name} key={pokeData.types[0].type.name}>{capitalize(pokeData.types[0].type.name)} </Type>
                    <Type type={pokeData.types[1]?.type.name} key={pokeData.types[1]?.type.name}>{capitalize(pokeData.types[1]?.type.name ?? "???")} </Type>
                </p>
            </div>
        </Link>
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
