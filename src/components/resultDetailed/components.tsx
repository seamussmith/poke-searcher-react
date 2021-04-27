import styled, { AnyStyledComponent, css, ThemedStyledFunction } from "styled-components";
import { capitalize } from "../util/util";

// Labels

export const Label = css`
    border-bottom: solid 2px transparent;
    border-image: radial-gradient(currentColor 20%, transparent 100%);
    border-image-slice: 1;
    margin: 10px auto;
    padding: 0.25ch 1ch;
    width: fit-content;
`

export const Label0 = styled.span`
    ${Label}
`

export const Label1 = styled.h1`
    ${Label}
`

export const Label2 = styled.h2`
    ${Label}
`

export const Label3 = styled.h3`
    ${Label}
`

export const NameLabel = styled.h1`
    ${Label}
    font-size: 30pt;
`

// Division Styling

export const Division = styled.div<{
    width?: number
    height?: number
}>`
    grid-column: span ${({width}) => (width ?? 8)} / auto;
    grid-row: span ${({height}) => (height ?? 1)} / auto;
    padding: 5px;
    background-color: var(--layer-2);
    border-radius: var(--division-radius);
    box-shadow: 1px 2px 0px 0px var(--shadow-color);
`

export const EvenDivision = styled(Division)`
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
`

export const StatDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
`

// Stat bars

const StatColors: any = {
    "hp": css`
        --primary: hsl(3, 81%, 25%);
        --secondary: hsl(3, 79%, 35%);
        --shadow: hsl(3, 100%, 11%);
        --tertiary: hsl(3, 100%, 14%); 
    `,
    "attack": css`
        --primary: hsl(22, 84%, 33%);
        --secondary: hsl(22, 93%, 44%);
        --shadow: hsl(22, 75%, 15%);
        --tertiary: hsl(22, 75%, 20%); 
    `,
    "defense": css`
        --primary: hsl(50, 88%, 35%);
        --secondary: hsl(50, 88%, 43%);
        --shadow: hsl(50, 100%, 24%);
        --tertiary: hsl(50, 80%, 18%); 
    `,
    "special-attack": css`
        --primary: hsl(222, 70%, 26%);
        --secondary: hsl(222, 59%, 48%);
        --shadow: hsl(222, 70%, 10%);
        --tertiary: hsl(222, 70%, 14%); 
    `,
    "special-defense": css`
        --primary: hsl(115, 80%, 23%);
        --secondary: hsl(115, 75%, 34%);
        --shadow: hsl(115, 75%, 10%);
        --tertiary: hsl(115, 84%, 12%); 
    `,
    "speed": css`
        --primary: hsl(330, 91%, 26%);
        --secondary: hsl(330, 91%, 43%);
        --shadow: hsl(330, 77%, 18%);
        --tertiary: hsl(330, 91%, 14%); 
    `,
    "total": css`
        --primary: hsl(0, 0%, 20%);
        --secondary: hsl(0, 0%, 43%);
        --shadow: hsl(0, 0%, 0%);
        --tertiary: hsl(0, 0%, 10%);
    `,
}

export const StatCmp = styled.div<{
    name: string
}>`
    ${({name}) => StatColors[name]}
    --stat-radius: 15px;
    box-shadow: 2px 2px 1px 0px var(--shadow);
    display: flex;
    align-items: center;
    background-color: var(--tertiary);
    width: 100%;
    height: 2.5em;
    border-radius: var(--stat-radius);
    margin: 5px;
`

export const StatBarContainer = styled.div`
    background-color: transparent;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    /* border: 2px solid var(--layer-0); */
    border: 2px solid var(--primary);
    border-radius: 0 var(--stat-radius) var(--stat-radius) 0;
`

export const StatBar = styled.div<{
    outOf: number
    stat: number
}>`
    display: flex;
    align-items: center;
    transition: 0.25s ease;
    width: calc(100% * (${({stat}) => stat}/${({outOf}) => outOf}));
    height: 100%;
    padding: 0 0 0 0.5ch;
    margin: 0;
    border-radius: 0 var(--stat-radius) var(--stat-radius) 0;
    /* box-shadow: 2px 0 1px 0px var(--shadow); */
    background-color: var(--secondary);
`

export const StatValue = styled.div`
    background-color: transparent;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    /* border: 2px solid var(--layer-0); */
    border: 2px solid var(--primary);
    border-radius: 0 var(--stat-radius) var(--stat-radius) 0;
`

export const StatName = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 25ch;
    padding: 0 1ch;
    background-color: var(--primary);
    border-radius: var(--stat-radius) 0 0 var(--stat-radius);
/*     border: 2px solid red; */
    box-shadow: 1px 0 4px var(--shadow);
    z-index: 1;
    border-right-width: 0px;
`

export function Stat(props: {
    name: string
    outOf: number
    stat: number
})
{
    return (
        <StatCmp name={props.name}>
            <StatName>
                {capitalize(props.name)}
            </StatName>
            <StatBarContainer>
                <StatBar stat={props.stat} outOf={props.outOf}>
                    {props.stat}
                </StatBar>
            </StatBarContainer>
        </StatCmp>
    )
}

