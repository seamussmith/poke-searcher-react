import { CustomEvent } from "../util/customEvent"
import { IPokemon } from "pokeapi-typescript"

// !!! Depreciated
export const InvokeQueryResult = new CustomEvent<{
    pokemon: IPokemon
}>()
