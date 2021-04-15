import React, { useEffect, useState } from 'react'

import '../typeColorClasses/typeColorClasses.css'
import './resultDetailed.css'

import CopyClicker from '../copyClicker/copyClicker'
import SearchResult from "../searchResult/searchResult"

import { capitalize, stylePokemonName } from '../util/util'
import { GetEvolutionTree, GetPokemon, GetPokemonSpecies } from '../util/PokeAPICache'
import {
    IPokemon,
    IPokemonSpecies,
    IPokemonStat,
    IPokemonType,
    IEvolutionChain,
    IChainLink
} from "pokeapi-typescript"

const NO_IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/399.png"

const PokemonProvider = React.createContext<{
    pokemon: IPokemon
    species: IPokemonSpecies
}|null>(null)

function ResultDetailed(props: {
    pokemon: IPokemon
    pkmnSpecies: IPokemonSpecies
})
{
    // Don't like typing this.props...
    const species = props.pkmnSpecies
    const pokemon = props.pokemon
    // Get the latest flavor text
    let latestFlavorText = species.flavor_text_entries
            .filter((e) => e.language.name === "en")   // get all english entries
            .reverse()[0]                              // Get the last element
            .flavor_text.replaceAll("\u000C", ' ')     // Remove weird char that exists in some entries
            .replaceAll(/(\r\n|\n|\r)/gm," ")          // Remove newline chars
    return (
        <div className='result-detailed'>
            <PokemonProvider.Provider value={{
                pokemon: pokemon,
                species: species
            }}>
                {/* [ROW 1] */}

                {/* Pokemon name, Portrait, Flairs, Type */}
                <Division width={4} height={1}>
                    <div className='result-detailed__division--pokemon'>
                        <h2 className='result-detailed__name-detailed'>
                            <span className={`${pokemon.types[0].type.name} result-detailed__label`}>{stylePokemonName(pokemon.name)}</span>
                        </h2>
                        <div>
                            <img
                            className='pokeimg'
                            // other.official-artwork not in interface for some reason
                            src={ (pokemon.sprites as any).other["official-artwork"].front_default ??
                            pokemon.sprites.front_default ??
                            NO_IMAGE }
                            alt={pokemon.name} />
                        </div>
                        <div className='result-detailed__flairs'>
                            <PkmnFlairs species={species} pkmnName={pokemon.name} />
                            <PkmnTypes types={pokemon.types} />
                        </div>
                    </div>                   
                </Division>

                {/* Stats, Info, Gender Ratios */}
                <Division width={4} height={1}>
                    <div className="result-detailed__division--info">    
                        <BaseStatList stats={pokemon.stats} />
                        <PkmnGenderRatio genderRatio={species.gender_rate} />
                    </div>
                </Division>

                {/* [ROW 2] */}

                <Division width={5} height={3}>
                    <Evolutions species={species}/>
                </Division>

                <Division width={3} height={1}>
                    <PkmnInfo pokemon={pokemon} species={species} />
                </Division>

                <Division width={3} height={1}>
                    <PokedexEntry flavorText={latestFlavorText} />
                </Division>

                {/* [ROW 3] */}

                {/* TODO: Insert egg group compatability here */}
                <Division width={8} height={1}>
                    <SharePokemon name={pokemon.name} />
                </Division>
            </PokemonProvider.Provider>
        </div>
    )
}

function Division(props: {
    children: React.ReactNode
    width: number
    height: number
})
{
    let styles = {
        "--grid-width": props.width,
        "--grid-height": props.height
    } as React.CSSProperties

    return (
        <div className="result-detailed__division" style={styles}>
            {props.children}
        </div>
    )
}

function Type(props: {
    type: string
    children: React.ReactNode
})
{
    return (
        <p className={`result-detailed__type ${props.type}`}>
            {props.children}
        </p>
    )
}

// Element that display's the pokemon's types
function PkmnTypes(props: {
    types: IPokemonType[]
})
{
    return (
        <p className='result-detailed__types-detailed'>
            {props.types.map((i) =>
                <Type type={i.type.name}><span>{capitalize(i.type.name)}</span></Type>
            )}
        </p>
    )
}

// Element for displaying Pokemon stats
function PkmnStat(props: {
    name: string
    stat: string | number
})
{
    return (
        <div className='result-detailed__stat'>
            <p>{props.name}:</p>
            <p>{props.stat}</p>
        </div>
    )
}

// Element that generates all the elements for a pokemon's stats
function BaseStatList(props: {
    stats: IPokemonStat[]
})
{
    return (
        <div>
            <h1 className="result-detailed__label">Stats </h1>
            <div className='result-detailed__base-stats'>
                {
                props.stats.map((stat) =>
                    <PkmnStat name={capitalize(stat.stat.name).replace("-", " ")} stat={stat.base_stat} />
                )
                }
            </div>
        </div>
    )
}

// Element that displays the pokemon's gender ratio or genderlessness
function PkmnGenderRatio(props: {
    genderRatio: number
})
{
    let femaleRatio = props.genderRatio/8 * 100 // gender is stored in eighths
    let maleRatio = 100 - femaleRatio // Get male ratio
    let genderElements: JSX.Element

    if (props.genderRatio === -1)
    {
        genderElements = (
            <div className='result-detailed__gender'>
                <h1>Genderless</h1>
            </div>
        )
    }
    else
    {
        genderElements = (
            <>
                <div className='result-detailed__gender result-detailed__gender--male'>
                    <h1><i className="fas fa-mars --force-inheritence"></i> {maleRatio}%</h1>
                </div>
                <div className='result-detailed__gender result-detailed__gender--female'>
                    <h1><i className="fas fa-venus --force-inheritence"></i> {femaleRatio}%</h1>
                </div>
            </>
        )
    }
        
    return (
        <div>
            <h1 className="result-detailed__label">Gender ratio </h1>
            <div className='result-detailed__gender-rates'>
                {genderElements}
            </div>
        </div>
    )
}

// Element for the pokemon's Pokedex flavor text
function PokedexEntry(props: {
    flavorText: string
})
{
    return (
        <>
            <h2 className="result-detailed__label">Pokedex Desc.</h2>
            <p className='result-detailed__flavor-text'>{props.flavorText}</p>
        </>
    )
}

function InfoStat(props: {
    icoName: string,
    children: React.ReactNode
})
{
    return (
        <div className="result-detailed__pkmn-info-stat">
            <span className="result-detailed__pkmn-info-icon">
                <i className={props.icoName}></i>
            </span> <span>{props.children}</span>
        </div>
    )
}

// Element that displays the pokemon's extra info 
function PkmnInfo(props: {
    pokemon: IPokemon
    species: IPokemonSpecies
})
{
            // Format all the egg group names
    let eggGroupText = props.species.egg_groups
                                    .map(
                                        (e) => capitalize(e.name === "no-eggs" ? "undiscovered" : e.name)
                                    ) // Map out the egg groups the pokemon is in
    if (!eggGroupText.join("")) // Check if there are no egg groups (failsafe)
        eggGroupText = ["N/A"]
    return (
        <div className="result-detailed__pkmn-info-base">
            <h2 className="result-detailed__label">Pokemon Info</h2>
            <div className="result-detailed__pkmn-info">
                <InfoStat icoName="fas fa-hashtag">
                    ID {
                        props.pokemon.id < 10_000 ?
                        `#${props.pokemon.id}` :
                        "N/A"
                    }
                </InfoStat>
                <InfoStat icoName="fas fa-weight-hanging">
                    Weight: {props.pokemon.weight/10}kg
                </InfoStat>
                <InfoStat icoName="fas fa-tree">
                    Likes {props.species.habitat?.name ?? "no"} environments
                </InfoStat>
                <InfoStat icoName="fas fa-egg">
                    Egg groups: {eggGroupText.join(", ")}
                </InfoStat>
            </div>
        </div>
    )
}

function Flair(props: {
    color: string
    children: React.ReactNode
})
{
    const styles = {
        "--flair-color": props.color
    } as React.CSSProperties
    return (
        <p className="result-detailed__flair" style={styles}>
            {props.children}
        </p>
    )
}

// Element that displays any special attributes the pokemon has (legendary, mega evolution, etc...)
function PkmnFlairs(props: {
    species: any // is_legendary and is_mythical is not in IPokemonSpecies
    pkmnName: string
})
{
    let splitName = props.pkmnName.split("-")
    // Generate the flairs for the pokemon
    let flairs = []
    if (props.species.is_legendary)
    {
        flairs.push(<Flair color="#ffd700">Legendary Pokemon</Flair> )
    }
    if (props.species.is_mythical)
    {
        flairs.push(<Flair color="#e70de7">Mythical Pokemon</Flair>)
    }
    if (splitName.some((e) => e === "mega"))
    {
        flairs.push(<Flair color="#00a9cc">Mega evolution</Flair>)
    }
    if (splitName.some((e) => e === "gmax"))
    {
        flairs.push(<Flair color="#c02727">Gigamax Form</Flair>)
    }
    return (
        <div>
            {flairs}
        </div>
    )
}

function SharePokemon(props: {
    name: string
})
{
    return (
        <p>Share this Pokemon <span className="--bigify"><i className="fas fa-share"></i></span> <br />
            <CopyClicker copyTxt={`${window.location.origin + window.location.pathname}?pkmn=${props.name}`} />
        </p>
    )
}

function Evolutions(props: {
    species: IPokemonSpecies
})
{
    const [pokemon, setPokemon] = useState<IPokemon[]|null>(null)

    // when the component mounts
    // componentDidMount
    useEffect(() => {
        GetEvolutionTree(props.species.evolution_chain.url)
            .then(result => unwrapChain(result))
            .then(pokemons => setPokemon(pokemons))
    }, [])

    return (
        <>
            <h1 className="result-detailed__label">Evolutions/Variants</h1>
            <div className="result-detailed__pokemon-grid">
                {pokemon?.map((pkmn) => {
                    <SearchResult pokeData={pkmn} disabled={false}/>
                }) ?? "Loading..."}
            </div>
        </>
    )
}

async function unwrapChain(evoChain: IEvolutionChain)
{
    // each species named url
    let urls: string[] = []
    // stack of evolves_to properties
    let evoStack: IChainLink[] = []

    // push the first evolution onto the stack
    evoStack.push(evoChain.chain)
    // while the stack isnt empty
    while (evoStack.length !== 0)
    {
        // pop the first evolution off the evo stack
        let item = evoStack.pop()
        // push the evolution's species data into result
        urls.push(item!.species.url)
        // push all evolutions to the stack
        evoStack.push(...item!.evolves_to)
    }

    // Fetch all the pokemon species data
    let speciesEntries = await Promise.all(urls.map(url => GetPokemonSpecies(url)))

    // *external screaming*
    // Fetch all the pokemon data
    let pokemonPromise = Promise.all(
        speciesEntries.map( // Each species has an array of varieties
            entry => entry.varieties.map(v => GetPokemon(v.pokemon.url)) // Fetch each variety in the species
            ).flat()) // Flatten the array

    // Return the resulting pokemons
    return await pokemonPromise
}

export default ResultDetailed
