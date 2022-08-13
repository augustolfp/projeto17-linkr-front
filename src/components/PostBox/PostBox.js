import styled from "styled-components";
import { useState, useContext } from "react";
import userDataContext from "../../contexts/userDataContext";
import axios from "axios";

export default function PostBox() {
    const [postUrl, setPostUrl] = useState("");
    const [postDescription,setPostDescription] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const { userData, setUserData } = useContext(userDataContext);

    function publishPost(event) {
        event.preventDefault();
        setIsDisabled(true);
        const token = userData.token;
        const body = {
            postUrl,
            postDescription
        }
        console.log(token);
        console.log(body);
        const sendPost = axios.post(`${process.env.REACT_APP_API_URL}/publish`, body, token);

        sendPost.then(() => {
            setIsDisabled(false);
            console.log("Post enviado com sucesso!");
        });
        sendPost.catch(() => {
            setIsDisabled(false);
            console.log("Ocorreu um erro no envio do post!");
        });
    }

    return(
        <PostCreatorContainer>
            <PerfilPhoto image={userData.pictureUrl}></PerfilPhoto>
            <Container>
                <h1>What are you going to share today?</h1>
                <Form onSubmit={publishPost}> 
                    <input type="text" name="url" value={postUrl} onChange={e => setPostUrl(e.target.value)} placeholder="http://..." disabled={isDisabled} required />
                    <input type="text" name="text" value={postDescription} onChange={e => setPostDescription(e.target.value)} placeholder="Awesome article about #javascript" disabled={isDisabled} required />
                    <button type="submit" disabled={isDisabled}>{ isDisabled ? "Publishing.." : "Publish" }</button>
                </Form>
            </Container>
        </PostCreatorContainer>
    );
}

const PostCreatorContainer = styled.div`
    display: flex;
    width: 50vw;
    background-color: white;
    border-radius: 10px;
    padding: 18px;

    h1 {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        color: #707070;
        font-size: 20px;
    }
`

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
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