import { CustomEvent } from "../util/customEvent";

export const InvokeQueryResult = new CustomEvent<{
    pokemon: string
    species: string
}>()
