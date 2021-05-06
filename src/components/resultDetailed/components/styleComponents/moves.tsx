import styled from "styled-components";

export const MovesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 2fr));
    height: 500px;
    overflow: auto;
    background-color: var(--layer-0);
`

export const Move = styled.div`
    background-color: var(--layer-1);
    margin: 5px;
    box-shadow: 3px 3px 0px var(--shadow-color);
    border-radius: 10px;
    padding: 0 10px;
`

export const MoveType = styled.div`
    display: flex;
    justify-items: flex-start;
`
