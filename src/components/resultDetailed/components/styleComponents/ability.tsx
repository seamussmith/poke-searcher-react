import styled from "styled-components"

// Abilities

export const AbilityContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    margin: 5px;
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
