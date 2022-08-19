import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import CommentLayout from "./CommentLayout";
import CommentCreator from "./CommentCreator";

export default function CommentsBox(props) {

    const [comments, setComments] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);


    useEffect(() => {
        console.log("render!");
        const getMessages = axios.get(`${process.env.REACT_APP_API_URL}/comments/${props.postId}`);
        getMessages.then(answer => {
            setComments(answer.data);
        });

        getMessages.catch(answer => {
            console.log(answer);
        })
    }, [isDisabled]);

    return(
        <Container>
            {
                comments.length > 0 && (
                    comments.map((comment, index) => <CommentLayout key={index} {...comment} />)
                )
            }
            <CommentCreator postId={props.postId} isDisabled={isDisabled} setIsDisabled={setIsDisabled}/>
        </Container>
    );
}

const Container = styled.div`
    
`