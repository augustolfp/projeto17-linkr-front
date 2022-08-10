import styled from "styled-components";

export const Title = styled.div`
    display: flex; flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    width: 70%;

    @media (max-width: 900px) {
        padding-top: 30px;
        box-sizing: border-box;
    }
`

export const TextBox = styled.div`
    font-family: 'Passion One', cursive;
    h1{
        font-size: 5em;
    }
    h2{
        font-size: 3em;
    }
`

