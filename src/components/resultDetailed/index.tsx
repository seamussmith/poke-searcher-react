import React, { useContext, useEffect, useState, useRef } from 'react'

import '../typeColorClasses/typeColorClasses.css'

import CopyClicker from '../copyClicker'
import SearchResult from "../searchResult"
import PokemonContext from "./pokemonContext"
import {
    Stat,
    Label1,
    Label2,
    Label,
    NameLabel,
    Label0,
    Division,
    EvenDivision,
    TypeLabel,
    Flair,
    StatDiv,
    Gender,
    ResultDetailedGrid,
    InfoStat,
    PokemonGrid,
    Ability,
    AbilityContainer,
} from "./components"

import { capitalize, stylePokemonName } from '../util/util'
import { getPkmnByEndpoint, getPkmnByURL } from '../util/PokeAPICache'
import {
    IPokemon,
    IPokemonSpecies,
    IEvolutionChain,
    IChainLink,
    IAbility
} from "pokeapi-typescript"
import { useParams } from 'react-router'
import LoadingSpinner from '../loadingSpinner'

const NO_IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/399.png"

function ResultDetailed(props: {})
{
    const [pokemon, setPokemon] = useState({} as IPokemon)
    const [species, setSpecies] = useState({} as IPokemonSpecies)
    const params = useParams<{pkmn: string}>()
    const [ready, setReady] = useState(false)
    const firstRender = useRef(true)

    const self = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (window.screen.width < 720)
            self.current?.scrollIntoView()
        setReady(false)
        getPkmnByEndpoint<IPokemon>("pokemon", params.pkmn)
            .then(pkmn => {
                getPkmnByURL<IPokemonSpecies>(pkmn.species.url)
                    .then(spec => {
                        setPokemon(pkmn)
                        setSpecies(spec)
                        firstRender.current = false
                        setReady(true)
                    })
            })
    }, [params])
    if (firstRender.current)
        return <LoadingSpinner visible />

    const type0 = pokemon.types[0].type.name
    const type1 = pokemon.types[1]?.type.name

    let eggGroupText = species.egg_groups
                                    .map(
                                        (e) => capitalize(e.name === "no-eggs" ? "undiscovered" : e.name)
                                    ) // Map out the egg groups the pokemon is in
    if (!eggGroupText.join("")) // Check if there are no egg groups (failsafe)
        eggGroupText = ["N/A"]

    const latestFlavorText = species.flavor_text_entries
        .filter((e) => e.language.name === "en")   // get all english entries
        .reverse()[0]                              // Get the last element
        .flavor_text.replaceAll("\u000C", ' ')     // Remove weird char that exists in some entries
        .replaceAll(/(\r\n|\n|\r)/gm," ")          // Remove newline chars

    const genderRatio = species.gender_rate

    const femaleRatio = genderRatio/8 * 100 // gender is stored in eighths
    const maleRatio = 100 - femaleRatio // Get male ratio

    // Get the latest flavor text
    return (
        <ResultDetailedGrid ref={self}>
            <PokemonContext.Provider value={{
                pokemon: pokemon,
                species: species
            }}>

                {/* [ROW 1] */}

                {/* Pokemon name, Portrait, Flairs, Type */}
                <EvenDivision width={4} height={1}>
                    <NameLabel className={type0}>
                        {stylePokemonName(pokemon.name)}
                    </NameLabel>
                    <div>
                        <img
                        className='pokeimg'
                        // other.official-artwork not in interface for some reason
                        src={ (pokemon.sprites as any).other["official-artwork"].front_default ??
                        pokemon.sprites.front_default ??
                        NO_IMAGE }
                        alt={pokemon.name} />
                    </div>
                    <div>
                        <PkmnFlairs />
                        <TypeLabel typeName={type0} key={type0}></TypeLabel>
                        <TypeLabel typeName={type1} key={type1}></TypeLabel>
                    </div>
                </EvenDivision>

                {/* Stats, Gender Ratio */}
                <EvenDivision width={4} height={1}>
                    <Label1>Stats</Label1>
                    <StatDiv>
                        {
                        pokemon.stats.map((stat) =>
                            <Stat
                                name={stat.stat.name}
                                stat={stat.base_stat}
                                outOf={255}
                                key={stat.stat.name} />
                        )
                        }
                        <Stat
                            name={"total"}
                            stat={pokemon.stats.map(stat => stat.base_stat).reduce((n, c) => n + c)}
                            outOf={1125} />
                    </StatDiv>
                    <Label1>Gender ratio </Label1>
                    <StatDiv>
                        {genderRatio !== -1 ?
                        <>
                            <Gender gender="male" ratio={maleRatio}/>
                            <Gender gender="female" ratio={femaleRatio}/>
                        </> :
                            <Gender />
                        }
                    </StatDiv>
                </EvenDivision>

                {/* [ROW 2] */}

                <Division width={5} height={3}>
                    <Label1>Evolutions/Variants</Label1>
                    <Evolutions />
                </Division>

                <EvenDivision width={3} height={1}>
                    <Label2>Pokemon Info</Label2>
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
                </EvenDivision>

                <Division width={3} height={1}>
                    <Label2>Pokedex Desc.</Label2>
                    <p>{latestFlavorText}</p>
                </Division>

                <Division width={8} height={1}>
                    <Label1>Abilities</Label1>
                    <Abilities />
                </Division>

                {/* [ROW 4] */}

                <Division width={8} height={1}>
                    <p>Share this Pokemon <span className="--bigify"><i className="fas fa-share"></i></span> <br />
                        <CopyClicker copyTxt={`${window.location.origin + window.location.pathname}`} />
                    </p>
                </Division>
            </PokemonContext.Provider>
        </ResultDetailedGrid>
    )
}


// Element that displays any special attributes the pokemon has (legendary, mega evolution, etc...)
function PkmnFlairs(props: {})
{
    const { pokemon, species } = useContext(PokemonContext)
    const looseSpecies = species as any
    let splitName = pokemon.name.split("-")
    // Generate the flairs for the pokemon
    let flairs = []
    if (looseSpecies.is_legendary)
    {
        flairs.push(<Flair color="#ffd700" key="legendary">Legendary Pokemon</Flair> )
    }
    if (looseSpecies.is_mythical)
    {
        flairs.push(<Flair color="#e70de7" key="mythical">Mythical Pokemon</Flair>)
    }
    if (splitName.some((e) => e === "mega"))
    {
        flairs.push(<Flair color="#00a9cc" key="mega">Mega evolution</Flair>)
    }
    if (splitName.some((e) => e === "gmax"))
    {
        flairs.push(<Flair color="#c02727" key="giga">Gigantamax Form</Flair>)
    }
    return (
        <div>
            {flairs}
        </div>
    )
}

function Abilities(props: {})
{
    const { pokemon } = useContext(PokemonContext)

    const [abilities, setAbilities] = useState<IAbility[]|null>(null)

    useEffect(() => {
        Promise.all(pokemon.abilities.map((e) => getPkmnByURL<IAbility>(e.ability.url)))
            .then(result => setAbilities(result))
    }, [pokemon])

    return (
        <AbilityContainer>
            {
                abilities?.map((ability) => <Ability ability={ability} key={ability.id}/>) ?? <LoadingSpinner visible />
            }
        </AbilityContainer>
    )
}

function Evolutions(props: {})
{
    const [pokemonList, setPokemonList] = useState<IPokemon[]|null>(null)
    const { pokemon, species } = useContext(PokemonContext)

    // when the component mounts
    // componentDidMount
    useEffect(() => {
        getPkmnByURL<IEvolutionChain>(species.evolution_chain.url)
            .then(result => unwrapChain(result)) // vv Push default variants to the top of the list
            .then(pokemons => setPokemonList(pokemons.sort((a, b) => Number(b.is_default) - Number(a.is_default))))
    }, [species.evolution_chain.url])

    return (
        <PokemonGrid>
            {pokemonList?.map((pkmn) => 
                <SearchResult
                pokemon={pkmn}
                disabled={pokemon.name === pkmn.name}
                key={pkmn.name}/>)
                ?? <LoadingSpinner visible />}
        </PokemonGrid>
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
    let speciesEntries = await Promise.all(urls.map(url => getPkmnByURL<IPokemonSpecies>(url)))

    // *external screaming*
    // Fetch all the pokemon data
    let pokemonPromise = Promise.all(
        speciesEntries.map( // Each species has an array of varieties
            entry => entry.varieties.map(v => getPkmnByURL<IPokemon>(v.pokemon.url)) // Fetch each variety in the species
            ).flat()) // Flatten the array

    // Return the resulting pokemons
    return await pokemonPromise
}

export default ResultDetailed
