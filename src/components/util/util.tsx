import React from 'react'

export function capitalize(s: string): string
{
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export function stylePokemonName(str: string): JSX.Element
{
    let splitStr: any[]
    if (str !== "ho-oh") // WHY IS THERE A POKEMON WITH A HYPHEN IN THEIR NAME?? WHY IS HO-OH THE ONLY ONE????
        splitStr = str.split("-").map(e => capitalize(e))
    else
        return <span>{capitalize(str)}</span> // Ho-oh does not have male/female variants. Right? RIGHT???
    let genderSymbol = null
    if (splitStr[splitStr.length-1].match(/M$|Male$/))
    {
        delete splitStr[splitStr.length-1]
        genderSymbol = <i className="fas fa-mars --force-inheritence"></i>
    }
    else if (splitStr[splitStr.length-1].match(/F$|Female$/))
    {
        delete splitStr[splitStr.length-1]
        genderSymbol = <i className="fas fa-venus --force-inheritence"></i>
    }
    return (
        <span className="--force-inheritence">{splitStr.join(" ")} {genderSymbol}</span>
    )
}

export function escapeRegExp(str: string) 
{
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
