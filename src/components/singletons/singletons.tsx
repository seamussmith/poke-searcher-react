import { CustomEvent } from "../util/customEvent"
import { IPokemon } from "pokeapi-typescript"

export const InvokeQueryResult = new CustomEvent<{
    pokemon: IPokemon
}>()
