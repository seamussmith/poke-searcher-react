import React, { useState } from 'react'
import { InvokeQueryResult } from "../singletons/singletons"
import { capitalize } from "../util/util"
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
    InvokeQueryResult.Subscribe((args) => setValue(capitalize(args.pokemon.name)))

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
