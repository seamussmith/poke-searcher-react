import styled from "styled-components";

export const MovesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 2fr));
    height: 500px;
    overflow: auto;
    background-color: var(--layer-0)
`

export const Move = styled.div`
    background-color: var(--layer-1);
    margin: 5px;
    border: 1px red solid;
    padding: 0 10px;
`
