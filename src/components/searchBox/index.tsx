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
            <Link to="/" className="search-box__link">
                <img src={logo} alt="pokesearcher logo" className="search-box__logo"></img>
            </Link>
            <div className="search-box__input-wrapper">
                <div className="search-box__search-icon">
                    <i className="fas fa-search"></i>
                </div>
                <input
                type="text"
                className="search-box__input"
                placeholder="Search for a Pokemon!"
                spellCheck={false}
                value={value}
                onChange={onChange}/>
            </div>
            
        </div>
    )
}

export default SearchBox;
