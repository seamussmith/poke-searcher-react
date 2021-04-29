import styled from "styled-components"

// Gender

const GenderColors: any = {
    "male": "var(--male-stat-background)",
    "female": "var(--female-stat-background)"
}

export const GenderLabel = styled.div<{
    gender: string
}>`
    flex-grow: 1;
    width: 40%;
    height: 84px;
    display: flex;
    border-radius: var(--mini-divison-radius);
    flex-direction: column;
    justify-content: center;
    background-color: ${({gender}) => GenderColors[gender] ?? "var(--layer-1)"};
    box-shadow: 1px 2px 0px 0px var(--shadow-color);
    margin: 5px;
`
