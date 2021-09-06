import React, { useContext, useEffect, useState, useRef } from 'react'

import '../typeColorClasses/typeColorClasses.css'

import CopyClicker from '../copyClicker'
import PokemonContext from "./pokemonContext"
import {
    Stat,
    Label1,
    Label2,
    NameLabel,
    Division,
    EvenDivision,
    TypeLabel,
    StatDiv,
    Gender,
    ResultDetailedGrid,
    InfoStat,
    Ability,
    AbilityContainer,
    Evolutions,
    PokedexDesc,
    Moves,
    GigantamaxFlair,
    LegendaryFlair,
    MythicalFlair,
    MegaEvolutionFlair,
    AlternativeFormFlair,
    EternamaxFlair
} from "./components"

import { capitalize, isStringPositiveInteger, stylePokemonName } from '../util/util'
import { getPkmnByEndpoint, getPkmnByURL } from '../util/PokeAPICache'
import {
    IPokemon,
    IPokemonSpecies,
    IAbility
} from "pokeapi-typescript"
import { useHistory, useParams } from 'react-router'
import LoadingSpinner from '../loadingSpinner'

const NO_IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/399.png"

function ResultDetailed(props: {})
{
    const [pokemon, setPokemon] = useState({} as IPokemon)
    const [species, setSpecies] = useState({} as IPokemonSpecies)
    const history = useHistory()
    const params = useParams<{id:string, name:string}>()
    const [ready, setReady] = useState(false)

    const self = useRef<HTMLDivElement>(null)

    // onURLChanged
    useEffect(() => {
        if (window.screen.width < 720)
            self.current?.scrollIntoView()
        if (!isStringPositiveInteger(params.id))
        {
            history.push("/")
            return
        }
        getPkmnByEndpoint<IPokemon>("pokemon", params.id)
            .then(pkmn => {
                // correct name in url if incorrect
                if (pkmn.name !== params.name)
                {
                    history.push(`/${pkmn.id}/${pkmn.name}`)
                    return
                }
                getPkmnByURL<IPokemonSpecies>(pkmn.species.url)
                    .then(spec => {
                        setPokemon(pkmn)
                        setSpecies(spec)
                        setReady(true)
                    })
            })
            .catch(_ => history.push("/"))
    }, [params, history])

    if (!ready)
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
                        pokemon.stats.map(({stat:{name}, base_stat}) =>
                            <Stat
                                name={name}
                                stat={base_stat}
                                outOf={255}
                                key={name} />
                        )
                        }
                        <Stat
                            name={"total"}
                            stat={pokemon.stats.map(({base_stat}) => base_stat).reduce((n, c) => n + c)}
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

                <EvenDivision width={5} height={2}>
                    <Label1>Evolutions/Variants</Label1>
                    <Evolutions />
                </EvenDivision>

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
                    <InfoStat icoName="fas fa-ruler-vertical">
                        Height: {pokemon.height*10}cm
                    </InfoStat>
                    <InfoStat icoName="fas fa-tree">
                        Likes {species.habitat?.name ?? "no"} environments
                    </InfoStat>
                    <InfoStat icoName="fas fa-egg">
                        Egg groups: {eggGroupText.join(", ")}
                    </InfoStat>
                </EvenDivision>

                <EvenDivision width={3} height={1}>
                    <Label2>Pokedex Desc.</Label2>
                    <PokedexDesc>{latestFlavorText}</PokedexDesc>
                </EvenDivision>

                <Division width={5} height={1}>
                    <Label1>Moves</Label1>
                    <Moves />
                </Division>

                <Division width={3} height={1}>
                    <Label1>Abilities</Label1>
                    <Abilities />
                </Division>

                {/* [ROW 4] */}

                <Division width={8} height={1}>
                    <p>Share this Pokemon <span className="--bigify"><i className="fas fa-share"></i></span> <br />
                        <CopyClicker copyTxt={window.location.href.split('?')[0]} />
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
    let couldBeAlternate = true;
    if (looseSpecies.is_legendary)
    {
        flairs.push(<LegendaryFlair key="legendary">Legendary Pokemon</LegendaryFlair> )
    }
    if (looseSpecies.is_mythical)
    {
        flairs.push(<MythicalFlair key="mythical">Mythical Pokemon</MythicalFlair>)
    }
    if (splitName.some((e) => e === "mega"))
    {
        couldBeAlternate = false;
        flairs.push(<MegaEvolutionFlair key="mega">Mega evolution</MegaEvolutionFlair>)
    }
    if (splitName.some((e) => e === "gmax"))
    {
        couldBeAlternate = false;
        flairs.push(<GigantamaxFlair key="giga">Gigantamax Form</GigantamaxFlair>)
    }
    if (splitName.some((e) => e === "eternamax"))
    {
        couldBeAlternate = false;
        flairs.push(<EternamaxFlair key="giga">Eternamax Form</EternamaxFlair>)
    }
    if (!pokemon.is_default && couldBeAlternate)
    {
        flairs.push(<AlternativeFormFlair key="alt">Alternative Form</AlternativeFormFlair>)
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

export default ResultDetailed
