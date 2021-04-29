import styled from "styled-components"

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
    width: 60vw;
    transform-origin: top;
    border-color: var(--pokemon-color);
    background-color: var(--layer-1);
    border-radius: var(--division-radius);
    box-shadow: 1px 2px 2px 1px var(--shadow-color);
    padding: 10px;
    margin: 1% 0;
    @media (max-width: 1280px) {
        width: 80vw;
    }
    @media (max-width: 900px) {
        width: 100vw;
    }
`
