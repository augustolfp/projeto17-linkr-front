import styled from "styled-components";

export default function PostBox(props) {
    return(
        <PostBoxContainer>
            <ProfilePhoto image={props.userPictureUrl}></ProfilePhoto>
            <ContentContainer>
            <h2>{props.username}</h2>
            <h3>{props.text}</h3>
            {props.url}
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
    padding: 18px;
    color: white;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    
    h2 {
        font-size: 19px;
    }

    h3 {
        font-size: 17px;
        color: #B7B7B7;
    }
    @media (max-width: 670px) {
        border-radius: 0px;
    }
`

const ProfilePhoto = styled.div`
    border-radius: 50%;
    background: ${props => props.image ? `url(${props.image})` : "white"};
    background-position: center;
    background-size: cover;
    width: 40px;
    height: 40px;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`