
// InfoStat

import styled from "styled-components"

export const InfoStatParent = styled.div`
    display: flex;
    align-items: center;
    background-color: var(--layer-1);
    box-shadow: 1px 1px 1px var(--shadow-color);
    border-radius: var(--mini-divison-radius);
    padding: 10px 0;
    margin: 5px;
    text-align: left;
`

export const InfoStatIcon = styled.div`
    background-color: var(--layer-2);
    border-radius: var(--mini-divison-radius);
    box-shadow: 1px 1px 1px var(--shadow-color);
    /* flexbox abuse 😳 */
    display: inline-flex;
    justify-content: center;
    width: 15px;
    padding: 15px;
    margin: 0px 1ch;
`

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
