import styled from "styled-components";

export default function InterfaceBackground(props) {
    return(
        <Container>
            <TitleTimeline>{props.type}</TitleTimeline>
            {props.children}
        </Container>
    );
}

const Container = styled.div`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #333333;
    gap: 10px;
    @media (max-width: 670px) {
        width: 100%;
        max-width: 100%;
    }

`

const TitleTimeline = styled.h3`
    padding-bottom: 20px;
    width: 100%;
    color: white;
    font-family: 'Oswald', cursive;
    font-weight: 700;
    font-size: 2em;
    text-indent: 0.3em;
`