import React, { useContext, useEffect, useState } from 'react'
import { InvokeQueryResult } from "../singletons/singletons"
import { capitalize, formatPokemonName } from "../util/util"
import './searchBox.css'

function SearchBox(props: {
    keyUp: (query: string) => void
})
{
    const [value, setValue] = useState("")
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.keyUp(event.currentTarget.value)
        setValue(event.currentTarget.value)
    }
    useEffect(() => {
        InvokeQueryResult.Subscribe((args) => setValue(formatPokemonName(args.pokemon.name)))
    }, [])
    
    return (
        <div className="search-box">
            <h1 className="search-box__title">PokeSearcher!</h1>
            <input
            type="text"
            className="search-box__input"
            placeholder="Search for a Pokemon!"
            spellCheck={false}
            value={value}
            onChange={onChange}/>
        </div>
    )
}

export default SearchBox;
