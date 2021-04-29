
// Labels

import styled, { css } from "styled-components"

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
