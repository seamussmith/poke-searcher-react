import styled from "styled-components";

// Flair

const BaseFlair = styled.p`
    --flair-color: gray;
    --flair-shadow: darkgray;
    color: var(--text-color);
    text-shadow: 1px 1px black;
    background-color: var(--flair-color);
    box-shadow: 2px 2px var(--flair-shadow);
    font-size: 20pt;
    font-weight: bold;
    margin: 5px 10%;
    border-radius: 100px;
    padding: 2px 2px;
    display: block;
`

export const GigantamaxFlair = styled(BaseFlair)`
    --flair-color: #c02727;
    --flair-shadow: #691717;
`

export const LegendaryFlair = styled(BaseFlair)`
    --flair-color: #c02727;
    --flair-shadow: #691717;
`

export const MythicalFlair = styled(BaseFlair)`
    --flair-color: #c02727;
    --flair-shadow: #691717;
`

export const MegaEvolutionFlair = styled(BaseFlair)`
    --flair-color: #c02727;
    --flair-shadow: #691717;
`

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
