import { IMove, IPokemonMove } from "pokeapi-typescript";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MovesGrid, Stat } from "..";
import { getPkmnByURL } from "../../../util/PokeAPICache";
import { capitalize } from "../../../util/util";
import pokemonContext from "../../pokemonContext";
import { Label1 } from "../styleComponents/label";
import { Move } from "../styleComponents/moves";

export function Moves(props: {})
{
    const [moves, setMoves] = useState<IMove[]>([])
    const [ready, setReady] = useState(false)
    const { pokemon } = useContext(pokemonContext)
    useEffect(() => {
        Promise.all(pokemon.moves.map(e => getPkmnByURL<IMove>(e.move.url)))
            .then(result => {
                setMoves(result)
                setReady(true)
            })
    }, [pokemon])
    if (!ready)
        return null
    return (
        <MovesGrid>
            {moves.map(e => (
                <Move>
                    <Label1>{e.name.split("-").map(e => capitalize(e)).join(" ")}</Label1>
                    <Stat name="Power" outOf={255} stat={e.power ?? 0} />
                </Move>
            ))}
        </MovesGrid>
    )
}
