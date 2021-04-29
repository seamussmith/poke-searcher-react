
// Abilities

import { IAbility } from "pokeapi-typescript"
import React from "react"
import styled from "styled-components"
import { capitalize } from "../../../util/util"
import { Label2 } from "./label"

export const AbilityContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 5px;
    margin: 5px;
    @media (max-width: 720px)
    {
        grid-template-columns: 1fr;
    }
`

export const AbilityDiv = styled.div`
    text-align: center;
    display: grid;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    height: 10em;
    background-color: var(--layer-3);
    border-radius: 10px;
    box-shadow: 2px 2px 0 var(--shadow-color);
`

export const AbilityName = styled.div`
    text-align: left;
    background-color: var(--layer-1);
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: left;
    align-items: center;
`

export const AbilityDesc = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
`

export function Ability(props: {
    ability: IAbility
})
{
    const abilityData = props.ability.effect_entries.filter((e) => e.language.name === "en")[0]
    return (
        <AbilityDiv>
            <AbilityName>
                <Label2>{capitalize(props.ability.name).replace("-", " ")}</Label2>
            </AbilityName>
            <AbilityDesc>
                <p>
                    {abilityData?.short_effect ?? "[NO DESCRIPTION]" }
                </p>
            </AbilityDesc>
        </AbilityDiv>
    )
}
