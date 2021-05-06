import { IMove, IPokemonMove } from "pokeapi-typescript";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MovesGrid, Stat, TypeLabel } from "..";
import LoadingSpinner from "../../../loadingSpinner";
import { getPkmnByURL } from "../../../util/PokeAPICache";
import { capitalize } from "../../../util/util";
import pokemonContext from "../../pokemonContext";
import { Label1, Label2, Label3 } from "../styleComponents/label";
import { Move, MoveType } from "../styleComponents/moves";

export function Moves(props: {})
{
    const [moves, setMoves] = useState<IMove[]|null>(null)
    const { pokemon } = useContext(pokemonContext)
    useEffect(() => {
        Promise.all(pokemon.moves.map(e => getPkmnByURL<IMove>(e.move.url)))
            .then(result => setMoves(result))
    }, [pokemon])
    return (
        <MovesGrid>
            {moves?.map(e => (
                <Move key={e.id}>
                    <Label1>{e.name.split("-").map(e => capitalize(e)).join(" ")}</Label1>
                    <Label2>Type</Label2>
                    <div>
                        <TypeLabel typeName={e.type.name}></TypeLabel>
                    </div>
                    <Label2>Stats</Label2>
                    <Stat name="Power" outOf={255} stat={e.power ?? 0} />
                    <Stat name="Accuracy" outOf={100} stat={e.accuracy ?? 0} />
                    <Label2 style={{textAlign: "left"}}>Description</Label2>
                    <p>
                        {
                            e.effect_entries
                            .filter(i => i.language.name === "en")
                            .reverse()[0]
                            .short_effect
                            .replaceAll("$effect_chance%", `${e.effect_chance}%`)
                        }
                    </p>
                </Move>
            )) ?? <LoadingSpinner visible />}
        </MovesGrid>
    )
}
