import React from 'react'
import { capitalize, stylePokemonName } from '../util/util'
import '../typeColorClasses/typeColorClasses.css'
import CopyClicker from '../copyClicker/copyClicker'
import './resultDetailed.css'

type ResultDetailed_props = {
    pokemon: any
    pkmnSpecies: any
}
type ResultDetailed_state = {}
class ResultDetailed extends React.Component<ResultDetailed_props, ResultDetailed_state>
{
    render()
    {
        // Don't like typing this.props...
        const species = this.props.pkmnSpecies
        const pokemon = this.props.pokemon
        // Get the latest flavor text
        let latestFlavorText = species.flavor_text_entries
                                        .filter((e: any) => e.language.name === "en")
                                        .reverse()[0]
                                        .flavor_text.replaceAll("", ' ')
                                        .replaceAll(/(\r\n|\n|\r)/gm," ")
        return (
            <div className='search__result-detailed'>
                <div className='search__result-division search__result-division--pokemon'>
                    <h2 className='search__result-name-detailed'>
                        <span className={pokemon.types[0].type.name}>{stylePokemonName(pokemon.name)}</span>
                    </h2>
                    <div>
                        <img
                        className='pokeimg'
                        src={ pokemon.sprites.other["official-artwork"].front_default ??
                              pokemon.sprites.front_default ??
                              "TODO: INSERT NO ART PLACEHOLDER" }
                        alt={pokemon.name} />
                    </div>
                    <div className='search__result-flairs'>
                        <PkmnFlairs species={species} pkmnName={pokemon.name} />
                        <PkmnTypes types={pokemon.types} />
                    </div>
                </div>
                <div className='search__result-division search__result-division--info'>
                    <BaseStatList stats={pokemon.stats} />
                    {/* TODO: Just give <PkmnInfo /> the pokemon object itself... */}
                    <PkmnInfo pokemon={pokemon} species={species} />
                    <PkmnGenderRatio genderRatio={species.gender_rate} />
                </div>
                <PokedexEntry flavorText={latestFlavorText} />
                {/* Egg group compatability */}
                <SharePokemon name={pokemon.name} />
            </div>
        )
    }
}

// Element for displaying Pokemon stats
function PkmnStat(props: {
    name: string
    stat: string | number
})
{
    return (
        <div className='search__result-stat'>
            <p>{props.name}:</p>
            <p>{props.stat}</p>
        </div>
    )
}

// Element that generates all the elements for a pokemon's stats
function BaseStatList(props: {
    stats: any[]
})
{
    return (
        <div className='search__result-base-stats'>
            {
            props.stats.map((stat: any) =>
                <PkmnStat name={capitalize(stat.stat.name).replace("-", " ")} stat={stat.base_stat} />
            )
            }
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
    let genderElements: JSX.Element[] = []

    if (props.genderRatio === -1)
    {
        genderElements = [(
            <div className='search__result-gender'>
                <h1>Genderless</h1>
            </div>
        )]
    }
    else
    {
        genderElements = [
            <div className='search__result-gender search__result-gender--male'>
                <h1><i className="fas fa-mars --force-inheritence"></i> {maleRatio}%</h1>
            </div>,
            <div className='search__result-gender search__result-gender--female'>
                <h1><i className="fas fa-venus --force-inheritence"></i> {femaleRatio}%</h1>
            </div>
        ]
    }
        
    return (
        <div className='search__result-gender-rates'>
            {genderElements}
        </div>
    )
}

// Element for the pokemon's Pokedex flavor text
function PokedexEntry(props: {
    flavorText: string
})
{
    return (
        <div className='search__result-division search__result-division--pokedex'>
            <p className='search__result-flavor-text'>"{props.flavorText}"<br/> - Pokedex</p>
        </div>
    )
}

// Element that displays the pokemon's extra info 
function PkmnInfo(props: {
    pokemon: any
    species: any
})
{
            // Format all the egg group names
    let eggGroupText = props.species.egg_groups
                                    .map(
                                        (e: any) => capitalize(e.name === "no-eggs" ? "undiscovered" : e.name)
                                    ) // Map out the egg groups the pokemon is in
    if (!eggGroupText.join("")) // Check if there are no egg groups (failsafe)
        eggGroupText = ["N/A"]
    return (
        <div>
            <p>ID #{props.pokemon.id}</p>
            <p>Weight: {props.pokemon.weight/10}kg</p>
            <p className='search__result-habitat'>Likes {props.pokemon.habitat ?? "no"} environments</p>
            <p className='search__result-egg-group'>Egg groups: {eggGroupText.join(", ")}</p>
        </div>
    )
}

// Element that displays any special attributes the pokemon has (legendary, mega evolution, etc...)
function PkmnFlairs(props: {
    species: any
    pkmnName: string
})
{
    let splitName = props.pkmnName.split("-")
    // Generate the flairs for the pokemon
    let flairs = []
    if (props.species.is_legendary)
    {
        flairs.push(<p className='search__result-flair search__result-is-legendary'>Legendary Pokemon</p>)
    }
    if (props.species.is_mythical)
    {
        flairs.push(<p className='search__result-flair search__result-is-mythical'>Mythical Pokemon</p>)
    }
    if (splitName.some((e: any) => e === "mega"))
    {
        flairs.push(<p className='search__result-flair search__result-is-mega-evo'>Mega Evolution</p>)
    }
    if (splitName.some((e: any) => e === "gmax"))
    {
        flairs.push(<p className='search__result-flair search__result-is-gigamax'>Gigamax Form</p>)
    }
    if (splitName.some((e: any) => e === "alola"))
    {
        flairs.push(<p className='search__result-flair search__result-is-alola'>Alola Form</p>)
    }
    if (splitName.some((e: any) => e === "galar"))
    {
        flairs.push(<p className='search__result-flair search__result-is-galarian'>Galarian Form</p>)
    }
    return (
        <div>
            {flairs}
        </div>
    )
}

// Element that display's the pokemon's types
function PkmnTypes(props: {
    types: any[]
})
{
    return (
        <p className='search__result-types-detailed'>
            <span className={props.types[0].type.name}>{capitalize(props.types[0].type.name)} </span>
            <span className={(props.types[1]?.type.name ?? "")}>{capitalize(props.types[1]?.type.name ?? "")}</span>
        </p>
    )
}

function SharePokemon(props: {
    name: string
})
{
    return (
        <div className='search__result-division search__result-division--info'>
            <p>Share this Pokemon <span className="--bigify"><i className="fas fa-share"></i></span> <br />
                <CopyClicker copyTxt={`${window.location.origin + window.location.pathname}?pkmn=${props.name}`} />
            </p>
        </div>
    )
}

export default ResultDetailed
