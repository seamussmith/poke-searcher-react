import styled from "styled-components";


export const EvolutionsGrid = styled.div`
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
