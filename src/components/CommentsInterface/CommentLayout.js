import styled from "styled-components";

export default function CommentLayout(props) {
    return(
        <Container>
            <ProfilePhoto image={props.userPictureUrl}></ProfilePhoto>
            <TextContainer>
                <h2>{props.username}</h2>
                <h3>{props.text}</h3>
            </TextContainer>
        </Container>
    );
}

const ProfilePhoto = styled.div`
    border-radius: 50%;
    background: ${props => props.image ? `url(${props.image})` : "white"};
    background-position: center;
    background-size: cover;
    width: 39px;
    height: 39px;
`

const Container = styled.div`
    display: flex;
`

const TextContainer = styled.div`

`