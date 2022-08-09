import styled from "styled-components"

export const Background = styled.div`
    width: 100%;
    display: flex;
    background-color: #151515;
    height: 100vh;
    justify-content: space-between;
    
    @media (max-width: 900px) {
        flex-direction: column;
        align-items: center;  
    }   
`