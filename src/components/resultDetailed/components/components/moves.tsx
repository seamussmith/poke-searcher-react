import { IMove } from "pokeapi-typescript";
import React, { useContext, useEffect, useState } from "react";
import { MovesGrid, Stat, TypeLabel } from "..";
import LoadingSpinner from "../../../loadingSpinner";
import { getPkmnByURL } from "../../../util/PokeAPICache";
import { capitalize } from "../../../util/util";
import pokemonContext from "../../pokemonContext";
import { Label1, Label2 } from "../styleComponents/label";
import { Move } from "../styleComponents/moves";

export function Moves(props: {})
{
    const [moves, setMoves] = useState<IMove[]|null>(null)
    const { pokemon } = useContext(pokemonContext)
    
    // onPokemonUpdate
    useEffect(() => {
        // Grab all of the pokemon's moves
        Promise.all(
            pokemon.moves
                .filter(e => e.version_group_details.reverse()[0].move_learn_method.name === "level-up")
                .map(e => getPkmnByURL<IMove>(e.move.url))
        ).then(result => setMoves(result))
    }, [pokemon])

    return (
        <MovesGrid>
            {moves?.map(move => {
                let details = pokemon.moves.find(e => e.move.name === move.name)?.version_group_details
                let latest = details?.sort((a, b) => parseInt(a.version_group.url.split("/")[1]) - parseInt(b.version_group.url.split("/")[1]))[0]
                return {
                    ...move,
                    lv: latest?.level_learned_at ?? 420
                }
            })
                .sort((a, b) => a.lv - b.lv)
                .map(move => (
                <Move key={move.id}>
                    <Label1>
                        {move.name.split("-").map(e => capitalize(e)).join(" ")} |
                        Lv{move.lv}
                    </Label1>
                    <Label2>Type</Label2>
                    <div>
                        <TypeLabel typeName={move.type.name}></TypeLabel>
                    </div>
                    <Label2>Stats</Label2>
                    <Stat name="Power" outOf={255} stat={move.power ?? 0} />
                    <Stat name="Accuracy" outOf={100} stat={move.accuracy ?? 0} />
                    <Label2 style={{textAlign: "left"}}>Description</Label2>
                    <p>
                        {
                            // Get the move's latest english entry
                            move.effect_entries
                            .filter(i => i.language.name === "en")
                            .reverse()[0]
                            .short_effect
                            // Replace effect chance placeholder with the effect chance
                            .replaceAll("$effect_chance%", `${move.effect_chance}%`)
                        }
                    </p>
                </Move>
            )) ?? <LoadingSpinner visible />}
        </MovesGrid>
    )
}
