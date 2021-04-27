import { useContext } from "react"
import { capitalize, stylePokemonName } from "../../util/util"
import PokemonContext from "../pokemonContext"

const NO_IMAGE = ""

function Type(props: {
    type: string | null
    children: React.ReactNode
})
{
    return (
        <p className={`result-detailed__type ${props.type ?? "result-detailed__type--none"}`}>
            {props.children}
        </p>
    )
}

export default function PkmnMainBanner(props: {})
{
    const { pokemon } = useContext(PokemonContext)
    const imgElement = <img
                        className='pokeimg'
                        // other.official-artwork not in interface for some reason
                        src={ (pokemon.sprites as any).other["official-artwork"].front_default ??
                        pokemon.sprites.front_default ??
                        NO_IMAGE }
                        alt={pokemon.name} />
    
    return (
        <>
            <h2 className='result-detailed__name-detailed'>
                <span className={`${pokemon.types[0].type.name} result-detailed__label`}>{stylePokemonName(pokemon.name)}</span>
            </h2>
            <div>
                {imgElement}
            </div>
            <div className='result-detailed__flairs'>
                <PkmnFlairs />
                <PkmnTypes />
            </div>
        </>
    )
}

// Element that display's the pokemon's types
function PkmnTypes(props: {})
{
    const { pokemon } = useContext(PokemonContext)
    return (
        <div className='result-detailed__types-detailed'>
            <Type type={pokemon.types[0].type.name} key={pokemon.types[0].type.name}><span>{capitalize(pokemon.types[0].type.name)}</span></Type>
            <Type type={pokemon.types[1]?.type.name} key={pokemon.types[1]?.type.name}><span>{capitalize(pokemon.types[1]?.type.name ?? "???")}</span></Type>
        </div>
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
