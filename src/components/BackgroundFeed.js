import styled from "styled-components"

export const BackgroundFeed =  styled.div`
box-sizing: border-box;
padding: 10px 0px 10px 0px;
display: flex;
justify-content: center;
background-color: #333333;
height: 90.5vh;
gap: 20px;

@media (max-width: 670px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

`