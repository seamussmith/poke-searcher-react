import styled from "styled-components"

// Type
export const Type = styled.h1`
    display: inline-block;
    background-color: currentColor;
    text-shadow: 2px 2px 1px var(--shadow-color);
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
    width: 8ch;
`

export const EmptyType = styled(Type)`
    background-color: transparent;
    box-shadow: 0 0 10px inset white;
`
