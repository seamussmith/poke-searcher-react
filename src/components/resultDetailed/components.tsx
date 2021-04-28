import { IAbility } from "pokeapi-typescript";
import styled, { css } from "styled-components";
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
    @media (max-width: 720px) {
        font-size: 25pt;
    }
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
    @media (max-width: 720px) {
        grid-column: span 8 / auto;
        grid-row: span 8 / auto;
    }
`

export const EvenDivision = styled(Division)`
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
    flex-direction: column;
`

export const StatDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
`

export const ResultDetailedGrid = styled.div`
    text-align: center;
    display: grid;
    grid-template-columns: repeat(8, 1fr); 

    gap: 10px;

    --pokemon-color: none;
    width: 1000px;
    transform-origin: top;
    border-color: var(--pokemon-color);
    background-color: var(--layer-1);
    border-radius: var(--division-radius);
    box-shadow: 1px 2px 2px 1px var(--shadow-color);
    padding: 10px;
    margin: 1% 0;
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
                {capitalize(props.name).replaceAll("-", " ")}
            </StatName>
            <StatBarContainer>
                <StatBar stat={props.stat} outOf={props.outOf}>
                    {props.stat}
                </StatBar>
            </StatBarContainer>
        </StatCmp>
    )
}

// Flair

export const Flair = styled.p<{
    color: string
}>`
    color: var(--text-color-inverse);
    background-color: ${({color}) => color};
    border: solid ${({color}) => color} 5px;
    font-size: 20pt;
    font-weight: bold;
    margin: 5px 10%;
    border-radius: 100px;
    display: block;
`

// Type
export const Type = styled.h1`
    display: inline-block;
    background-color: currentColor;
    text-shadow: 2px 2px 1px var(--shadow-color);
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
    width: 8ch;
`

export const EmptyType = styled(Type)`
    background-color: transparent;
    box-shadow: 0 0 10px inset white;
`

export function TypeLabel(props: {
    typeName: string | null
})
{
    if (props.typeName == null)
        return <EmptyType><span>???</span></EmptyType>
    else
        return <Type className={props.typeName}><span>{capitalize(props.typeName)}</span></Type>
}

// Gender

const GenderColors: any = {
    "male": "var(--male-stat-background)",
    "female": "var(--female-stat-background)"
}

export const GenderLabel = styled.div<{
    gender: string
}>`
    flex-grow: 1;
    width: 40%;
    height: 84px;
    display: flex;
    border-radius: var(--mini-divison-radius);
    flex-direction: column;
    justify-content: center;
    background-color: ${({gender}) => GenderColors[gender] ?? "var(--layer-1)"};
    box-shadow: 1px 2px 0px 0px var(--shadow-color);
    margin: 5px;
`

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

// InfoStat

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

export const PokemonGrid = styled.div`
    background-color: var(--layer-0);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
    grid-auto-rows: 150px;
    justify-content: center;

    gap: 10px;
    padding: 5px;
    margin: 10px;
    border: 2px solid var(--layer-1);
    overflow: auto;
    max-height: 480px;
    height: 520px;

    &::-webkit-scrollbar {
        width: 0.7em;
    }

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`

// Abilities

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
