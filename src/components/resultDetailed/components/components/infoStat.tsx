import React from "react";
import { InfoStatIcon, InfoStatParent } from "..";

export function InfoStat(props: {
    icoName: string,
    children: React.ReactNode
})
{
    return (
        <InfoStatParent>
            <InfoStatIcon>
                <i className={props.icoName}></i>
            </InfoStatIcon> <span>{props.children}</span>
        </InfoStatParent>
    )
}
