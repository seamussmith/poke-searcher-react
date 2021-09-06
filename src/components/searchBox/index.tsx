import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.svg"
import './index.css'

function SearchBox(props: {
    keyUp: (query: string) => void
})
{
    const [value, setValue] = useState("")
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.keyUp(event.currentTarget.value)
        setValue(event.currentTarget.value)
    }
    
    return (
        <div className="search-box">
            <Link to="/">
                <img src={logo} alt="pokesearcher logo" className="search-box__logo"></img>
            </Link>
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
