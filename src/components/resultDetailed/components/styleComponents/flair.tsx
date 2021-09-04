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
    --flair-color: #22a534;
    --flair-shadow: #1b7727;
`

export const MythicalFlair = styled(BaseFlair)`
    --flair-color: #a52a95;
    --flair-shadow: #5c1252;
`

export const AlternativeFormFlair = styled(BaseFlair)`
    --flair-color: #cc7829;
    --flair-shadow: #79481a;
`

export const MegaEvolutionFlair = styled(BaseFlair)`
    --flair-color: transparent;
    --flair-shadow: transparent;
    --mega-evo-gradient: linear-gradient(to right, #bac24e, #4bb84b, #48b4b6, #db58dd);

    position: relative;
    z-index: 0;
    background-image: var(--mega-evo-gradient);
    
    /* Emulating a box shadow but with a background image */
    &::before {
        content: "";
        position: absolute;

        /* Creates the sort of box shadow effect I like */
        /* Somehow... */
        opacity: 50%;
        background-image: var(--mega-evo-gradient);
        border-radius: 100px;

        z-index: -1;
        top: 2px;
        left: 2px;
        width: 100%;
        height: 100%;
    }
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
