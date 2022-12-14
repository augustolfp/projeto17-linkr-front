import styled from "styled-components";
import { useState, useContext } from "react";
import userDataContext from "../../contexts/userDataContext";
import axios from "axios";

export default function PostCreator(props) {
    const [postUrl, setPostUrl] = useState("");
    const [postDescription,setPostDescription] = useState("");
    const { userData } = useContext(userDataContext);

    function publishPost(event) {
        event.preventDefault();
        props.setIsDisabled(true);
        const hashtags = getHashTags(postDescription);
        
        const token = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        
        const body = {
            postUrl,
            postDescription,
            hashtags
        }
        
        const sendPost = axios.post(`${process.env.REACT_APP_API_URL}/publish`, body, token);

        sendPost.then(() => {
            setPostDescription("");
            setPostUrl("");
            props.setIsDisabled(false);
            console.log("Post enviado com sucesso!");
        });
        sendPost.catch(() => {
            alert("Houve um erro ao publicar seu link");
            props.setIsDisabled(false);
        });
    }

    function getHashTags(inputText) {  
        const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
        let hashtags = [];
        let match;
        while ((match = regex.exec(inputText))) {
            hashtags.push(match[1]);
        }
        return hashtags;
    }

    return(
        <PostCreatorContainer>
            <ProfilePhoto image={userData.pictureUrl}></ProfilePhoto>
            <Container>
                <h1>What are you going to share today?</h1>
                <Form onSubmit={publishPost}> 
                    <input type="text" name="url" value={postUrl} onChange={e => setPostUrl(e.target.value)} placeholder="http://..." disabled={props.isDisabled} required />
                    <input type="text" name="text" value={postDescription} onChange={e => setPostDescription(e.target.value)} placeholder="Awesome article about #javascript" disabled={props.isDisabled} />
                    <button type="submit" disabled={props.isDisabled}>{ props.isDisabled ? "Publishing.." : "Publish" }</button>
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
    width: 100%;
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
    gap: 5px;
    overflow: hidden;
`

const ProfilePhoto = styled.div`
    border-radius: 50%;
    background: ${props => props.image ? `url(${props.image})` : "white"};
    background-position: center;
    background-size: cover;
    width: 45px;
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