import React from "react"
import { GenderLabel } from ".."

export function Gender(props: {
    gender?: "male" | "female"
    ratio?: number
    children?: React.ReactNode 
})
{
    const genderMap: any = {
        "male": <i className="fas fa-mars"></i>,
        "female": <i className="fas fa-venus"></i>
    }
    return (
        <GenderLabel gender={props.gender ?? ""}>
            <h1>{genderMap[props.gender ?? ""] ?? "Genderless"} {props.ratio}{props.gender && "%"}</h1>
        </GenderLabel>
    )
}
