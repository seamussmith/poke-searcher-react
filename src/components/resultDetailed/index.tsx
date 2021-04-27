import React, { useContext, useEffect, useState, useRef } from 'react'

import '../typeColorClasses/typeColorClasses.css'
import './index.css'

import CopyClicker from '../copyClicker'
import SearchResult from "../searchResult"
import PokemonContext from "./pokemonContext"
import PkmnMainBanner from "./mainBanner"

import { capitalize, stylePokemonName } from '../util/util'
import { GetAbility, GetEvolutionTree, GetPokemon, GetPokemonSpecies } from '../util/PokeAPICache'
import {
    IPokemon,
    IPokemonSpecies,
    IEvolutionChain,
    IChainLink,
    IAbility
} from "pokeapi-typescript"

const NO_IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/399.png"

function ResultDetailed(props: {
    pokemon: IPokemon
    pkmnSpecies: IPokemonSpecies
})
{
    const [pokemon, setPokemon] = useState(props.pokemon)
    const [species, setSpecies] = useState(props.pkmnSpecies)

    const self = useRef<HTMLDivElement>(null)

    const onPokemonUpdate = (pokemonData: IPokemon) => {
        GetPokemonSpecies(pokemonData.species.url)
            .then(speciesData => {
                setPokemon(pokemonData)
                setSpecies(speciesData)
                if (window.screen.width < 720)
                    self.current?.scrollIntoView()
            })
    }

    // Get the latest flavor text
    return (
        <div className='result-detailed' ref={self}>
            <PokemonContext.Provider value={{
                pokemon: pokemon,
                species: species
            }}>
                {/* [ROW 1] */}

                {/* Pokemon name, Portrait, Flairs, Type */}
                <Division width={4} height={1}>
                    <div className='result-detailed__division--pokemon'>
                        <PkmnMainBanner />
                    </div>
                </Division>

                {/* Stats, Info, Gender Ratios */}
                <Division width={4} height={1}>
                    <div className="result-detailed__division--info">
                        <BaseStatList />
                        <PkmnGenderRatio />
                    </div>
                </Division>

                {/* [ROW 2] */}

                <Division width={5} height={3}>
                    <Evolutions onClick={onPokemonUpdate} />
                </Division>

                <Division width={3} height={1}>
                    <PkmnInfo />
                </Division>

                <Division width={3} height={1}>
                    <PokedexEntry />
                </Division>

                <Division width={8} height={1}>
                    <Abilities />
                </Division>

                {/* [ROW 4] */}

                {/* TODO: Insert egg group compatability here */}
                <Division width={8} height={1}>
                    <SharePokemon />
                </Division>
            </PokemonContext.Provider>
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

// Element for displaying Pokemon stats
function PkmnStat(props: {
    name: string
    outOf: number
    stat: string | number
})
{
    const styles = {
        "--stat": props.stat,
        "--out-of": props.outOf
    } as React.CSSProperties
    return (
        <div className={`result-detailed__stat ${`result-detailed__stat--${props.name}`}`}>
            <div className="result-detailed__stat-name">
                {capitalize(props.name).replace("-", " ")}
            </div>
            <div className="result-detailed__stat-bar-container">
                <div className="result-detailed__stat-bar" style={styles}>
                    <p className="result-detailed__stat-number">{props.stat}</p>
                </div>
            </div>
        </div>
    )
}

// Element that generates all the elements for a pokemon's stats
function BaseStatList(props: {})
{
    const { pokemon } = useContext(PokemonContext)
    return (
        <div>
            <h1 className="result-detailed__label">Stats </h1>
            <div className='result-detailed__base-stats'>
                {
                pokemon.stats.map((stat) =>
                    <PkmnStat name={stat.stat.name} stat={stat.base_stat} outOf={255} key={stat.stat.name}/>
                )
                }
                <PkmnStat name={"total"} stat={pokemon.stats.map(stat => stat.base_stat).reduce((n, c) => n + c)} outOf={1125}/>
            </div>
        </div>
    )
}

// Element that displays the pokemon's gender ratio or genderlessness
function PkmnGenderRatio(props: {})
{
    const { species } = useContext(PokemonContext)

    const genderRatio = species.gender_rate

    const femaleRatio = genderRatio/8 * 100 // gender is stored in eighths
    const maleRatio = 100 - femaleRatio // Get male ratio
    let genderElements: JSX.Element

    if (genderRatio === -1)
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
function PokedexEntry(props: {})
{
    const { species } = useContext(PokemonContext)
    let latestFlavorText = species.flavor_text_entries
            .filter((e) => e.language.name === "en")   // get all english entries
            .reverse()[0]                              // Get the last element
            .flavor_text.replaceAll("\u000C", ' ')     // Remove weird char that exists in some entries
            .replaceAll(/(\r\n|\n|\r)/gm," ")          // Remove newline chars
    return (
        <>
            <h2 className="result-detailed__label">Pokedex Desc.</h2>
            <p className='result-detailed__flavor-text'>{latestFlavorText}</p>
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
function PkmnInfo(props: {})
{
    const { pokemon, species } = useContext(PokemonContext)
            // Format all the egg group names
    let eggGroupText = species.egg_groups
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
                        pokemon.id < 10_000 ?
                        `#${pokemon.id}` :
                        "N/A"
                    }
                </InfoStat>
                <InfoStat icoName="fas fa-weight-hanging">
                    Weight: {pokemon.weight/10}kg
                </InfoStat>
                <InfoStat icoName="fas fa-tree">
                    Likes {species.habitat?.name ?? "no"} environments
                </InfoStat>
                <InfoStat icoName="fas fa-egg">
                    Egg groups: {eggGroupText.join(", ")}
                </InfoStat>
            </div>
        </div>
    )
}

function Ability(props: {
    ability: IAbility
})
{
    return (
        <div className="result-detailed__ability">
            <div className="result-detailed__ability-name">
                <h2 className="result-detailed__label">{capitalize(props.ability.name)}</h2>
            </div>
            <div className="result-detailed__ability-desc">
                <p>
                    {props.ability.effect_entries.filter((e) => e.language.name === "en")[0].short_effect}
                </p>
            </div>
        </div>
    )
}


function Abilities(props: {})
{
    const { pokemon } = useContext(PokemonContext)

    const [abilities, setAbilities] = useState<IAbility[]|null>(null)

    useEffect(() => {
        Promise.all(pokemon.abilities.map((e) => GetAbility(e.ability.url)))
            .then(result => setAbilities(result))
    }, [pokemon])

    return (
        <div className="result-detailed__abilities">
            <h1 className="result-detailed__label">Abilities</h1>
            <div className="result-detailed__abilities-container">
                {
                    abilities?.map((ability) => <Ability ability={ability}/>) ?? "Loading..."
                }
            </div>
        </div>
    )
}

function SharePokemon(props: {})
{
    const { pokemon } = useContext(PokemonContext)
    return (
        <p>Share this Pokemon <span className="--bigify"><i className="fas fa-share"></i></span> <br />
            <CopyClicker copyTxt={`${window.location.origin + window.location.pathname}?pkmn=${pokemon.name}`} />
        </p>
    )
}

function Evolutions(props: {
    onClick: (pokemon: IPokemon) => void
})
{
    const [pokemonList, setPokemonList] = useState<IPokemon[]|null>(null)
    const { pokemon, species } = useContext(PokemonContext)

    // when the component mounts
    // componentDidMount
    useEffect(() => {
        GetEvolutionTree(species.evolution_chain.url)
            .then(result => unwrapChain(result)) // vv Push default variants to the top of the list
            .then(pokemons => setPokemonList(pokemons.sort((a, b) => Number(b.is_default) - Number(a.is_default))))
    }, [species.evolution_chain.url])

    return (
        <>
            <h1 className="result-detailed__label">Evolutions/Variants</h1>
            <div className="result-detailed__pokemon-grid">
                {pokemonList?.map((pkmn) => 
                    <SearchResult
                    onClick={props.onClick}
                    pokemon={pkmn}
                    disabled={pokemon.name === pkmn.name}
                    key={pkmn.name}/>)
                    ?? "Loading..."}
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
