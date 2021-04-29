
// Flair

import styled from "styled-components";

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
