import React from "react";
import { StatBar, StatBarContainer, StatCmp, StatName } from "..";
import { capitalize } from "../../../util/util";

export function Stat(props: {
    name: string
    outOf: number
    stat: number
})
{
    return (
        <StatCmp name={props.name}>
            <StatName>
                {props.name.split("-").map(e => capitalize(e)).join(" ")}
            </StatName>
            <StatBarContainer>
                <StatBar stat={props.stat} outOf={props.outOf}>
                    {props.stat}
                </StatBar>
            </StatBarContainer>
        </StatCmp>
    )
}
