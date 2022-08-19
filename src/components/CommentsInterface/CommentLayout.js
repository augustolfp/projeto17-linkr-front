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
    margin-right: 8px;
    
`

const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 15px 25px;
    border-bottom: 1px solid #353535;
    padding-bottom: 16px;
`

const TextContainer = styled.div`
    * {
        font-family: 'Lato', sans-serif;
        font-size: 14px;
    }

    h2 {
        font-weight: 700;
        color: #f3f3f3;
        margin-bottom: 4px;
    }

    h3 {
        font-weight: 400;
        color: #acacac;
    }
`