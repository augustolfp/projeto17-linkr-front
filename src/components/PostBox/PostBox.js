import styled from "styled-components";
import { useState, useContext } from "react";
import userDataContext from "../../contexts/userDataContext";

export default function PostBox() {
    const [postUrl, setPostUrl] = useState("");
    const [postDescription,setPostDescription] = useState("");
    const { userData, setUserData } = useContext(userDataContext);
    function publishPost(event) {
        event.preventDefault();
    }

    return(
        <PostCreatorContainer>
            <PerfilPhoto image={userData.pictureUrl}></PerfilPhoto>
            <Container>
                <h1>What are you going to share today?</h1>
                <Form onSubmit={publishPost}> 
                    <input type="text" placeholder="http://..." onChange={e => setPostUrl(e.target.value)} required/>
                    <input type="text" placeholder="Awesome article about #javascript" onChange={e => setPostDescription(e.target.value)} required/>
                    <button type="submit">Publish</button>
                </Form>
            </Container>
        </PostCreatorContainer>
    );
}

const PostCreatorContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    background-color: white;
    border-radius: 20px;
    padding: 18px;
    gap: 20px;
    h1 {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        color: #707070;
        font-size: 20px;
    }
    @media (max-width: 670px) {
        width: 100%;
        border-radius: 0px;
    }
`

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`

const PerfilPhoto = styled.div`
    border-radius: 50%;
    background: ${props => props.image ? `url(${props.image})` : "white"};
    background-position: center;
    background-size: cover;
    width: 40px;
    height: 40px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;

    input {
        background-color: #EFEFEF;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 15px;
        border-style: none;
        border-radius: 5px;
        padding: 6px 14px;
        margin: 6px 0px;
        width: 100%;
        box-sizing: border-box;
    }

    button {
        background-color: #1877F2;
        color: white;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        border-style: none;
        border-radius: 5px;
        width: 112px;
        height: 32px;

    }
`