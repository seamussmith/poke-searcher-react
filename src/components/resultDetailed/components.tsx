import styled, { AnyStyledComponent, css, ThemedStyledFunction } from "styled-components";

// Labels

const Label = css`
    border-bottom: solid 2px transparent;
    border-image: radial-gradient(currentColor 20%, transparent 100%);
    border-image-slice: 1;
    margin: 10px auto;
    padding: 0.25ch 1ch;
    width: fit-content;
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
    height: 100%;
`

// 

