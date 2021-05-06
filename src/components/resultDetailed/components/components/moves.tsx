import { IMove, IPokemonMove } from "pokeapi-typescript";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MovesGrid, Stat } from "..";
import LoadingSpinner from "../../../loadingSpinner";
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
        return <LoadingSpinner visible />
    return (
        <MovesGrid>
            {moves.map(e => (
                <Move key={e.id}>
                    <Label1>{e.name.split("-").map(e => capitalize(e)).join(" ")}</Label1>
                    <Stat name="Power" outOf={255} stat={e.power ?? 0} />
                    <Stat name="Accuracy" outOf={100} stat={e.accuracy ?? 0} />
                    <p>
                        {
                            e.effect_entries
                            .filter(i => i.language.name === "en")
                            .reverse()[0]
                            .short_effect
                            .replaceAll("$effect_chance%", `${e.accuracy}%`)
                        }
                    </p>
                </Move>
            ))}
        </MovesGrid>
    )
}
