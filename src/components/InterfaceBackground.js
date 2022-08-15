import styled from "styled-components";

export default function InterfaceBackground(props) {
    return(
        <Container>
            <h3>{props.type}</h3>
            {props.children}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #333333;
    gap: 10px;
    h3{ 
        padding-bottom: 20px;
        width: 100%;
        color: white;
        font-family: 'Oswald', cursive;
        font-weight: 700;
        font-size: 2em;
        text-indent: 0.3em;
    }
    @media (max-width: 670px) {
        width: 100%;
    }
`