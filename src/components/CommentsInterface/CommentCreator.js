import styled from "styled-components";
import { useState, useContext } from "react";
import userDataContext from "../../contexts/userDataContext";
import axios from "axios";
import {TbSend} from "react-icons/tb";

export default function CommentCreator(props) {
    const [commentText, setCommentText] = useState("");
    const { userData } = useContext(userDataContext);

    function publishComment(event) {
        event.preventDefault();
        props.setIsDisabled(true);

        const token = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }

        const body = {
            text: commentText,
            postId: props.postId
        }

        const sendComment = axios.post(`${process.env.REACT_APP_API_URL}/publishcomment`, body, token);

        sendComment.then(() => {
            props.setIsDisabled(false);
            setCommentText("");
            console.log("Comentário enviado com sucesso");
        });

        sendComment.catch(() => {
            console.log("Erro ao enviar o comentário");
            props.setIsDisabled(false);
        });


    }

    return(
        <Container>
            <ProfilePhoto image={userData.pictureUrl}></ProfilePhoto>
            <FormContainer>
            <Form onSubmit={publishComment}>
                <input type="text" name="text" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="write a comment..." disabled={props.isDisabled} />
                <button type="submit" disabled={props.isDisabled}><TbSend/></button>
                
            </Form>
            </FormContainer>
        </Container>
    );
}

const Form = styled.form`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    input {
        background-color: #252525;
        font-family: 'Lato', sans-serif;
        font-style: italic;
        font-size: 14px;
        color: #575757;
        border-style: none;
        width: 100%;
        height: 39px;
        border-radius: 8px;
        padding-left: 15px;
    }

    button {
        position: absolute;
        right: 6px;;
        background: none;
        border: none;
        padding: 0;

        > svg {
            width: 18px;
            height: 18px;
            color: white;
        }
    }
`

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
    padding-bottom: 12px;
`
const FormContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
`