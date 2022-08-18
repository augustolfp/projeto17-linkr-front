import styled from "styled-components";
import { useState, useContext } from "react";
import userDataContext from "../../contexts/userDataContext";
import axios from "axios";

export default function CommentCreator(props) {
    const [commentText, setCommentText] = useState("");
    const { userData } = useContext(userDataContext);

    function publishComment(event) {
        event.preventDefault();

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
            console.log("Comentário enviado com sucesso");
        });

        sendComment.catch(() => {
            console.log("Erro ao enviar o comentário");
        });


    }

    return(
        <Form onSubmit={publishComment}>
            <input type="text" name="text" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="write a comment..." />
            <button type="submit">enviar</button>
        </Form>
    );
}

const Form = styled.form`

`