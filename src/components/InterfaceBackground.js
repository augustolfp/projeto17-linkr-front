import styled from "styled-components";

export default function InterfaceBackground(props) {
    return(
        <Container>
            {props.children}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #333333;
    width: 100vw;
    height: 100vh;
`