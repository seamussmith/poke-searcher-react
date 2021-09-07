import React from "react"
import { EmptyType, Type } from ".."
import { capitalize } from "../../../util/util"


export function TypeLabel(props: {
    typeName: string | null
})
{
    if (props.typeName == null)
        return <EmptyType><span><pre style={{padding: "0", margin: "0"}}>   </pre></span></EmptyType>
    else
        return <Type className={props.typeName}><span>{capitalize(props.typeName)}</span></Type>
}
