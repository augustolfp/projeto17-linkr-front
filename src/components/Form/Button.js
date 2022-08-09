import styled from "styled-components"

export const Button = styled.button`
    cursor: pointer;
    font-family: 'Passion One', cursive;
    padding: 15px;
    border-radius: 5px;
    border: none;
    width: 85%;
    font-size: 1.3em;
    background-color:  #1877F2;
    color: white;
    &:hover{
        background-color:  #4d91e9;
    }
    &:disabled{
        cursor: default;
        background-color:  #4d91e9;
    }
`