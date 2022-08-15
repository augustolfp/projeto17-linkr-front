import styled from "styled-components";

export default function PostBox(props) {
    return(
        <PostBoxContainer>
            <ProfilePhoto image={props.userPictureUrl}></ProfilePhoto>
            <ContentContainer>
                <h2>{props.username}</h2>
                <h3>{props.text}</h3>
                <span>{props.url}</span>
            </ContentContainer>
        </PostBoxContainer>
    );
}

const PostBoxContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    background-color: #171717;
    border-radius: 20px;
    padding: 15px;
    color: white;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    gap: 15px;
    @media (max-width: 670px) {
        border-radius: 0px;
    }
`

const ProfilePhoto = styled.div`
    border-radius: 50%;
    background: ${props => props.image ? `url(${props.image})` : "white"};
    background-position: center;
    background-size: cover;
    width: 50px;
    height: 50px;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    h2 {
        font-size: 19px;
    }
    h3 {
        font-size: 1em;
        color: #B7B7B7;
    }
`