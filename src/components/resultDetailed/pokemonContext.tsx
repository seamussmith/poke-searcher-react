import React from 'react'
import { IPokemon, IPokemonSpecies } from "pokeapi-typescript"

interface IPokemonProviderData
{
    pokemon: IPokemon
    species: IPokemonSpecies
}
export default React.createContext<IPokemonProviderData>({} as IPokemonProviderData) // not an accident waiting to happen ;)
