import { IAbility } from "pokeapi-typescript"
import React from "react"
import { AbilityDesc, AbilityDiv, AbilityName, Label2 } from ".."
import { capitalize } from "../../../util/util"

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
