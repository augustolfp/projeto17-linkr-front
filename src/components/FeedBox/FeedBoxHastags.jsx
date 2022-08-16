import { useState, useEffect } from "react";
import PostBox from "../PostBox/PostBox";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function FeedBoxHastags({hashtag}) {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`)
        .then( res =>{
            setPosts(res.data)
        })
        .catch( err => {
            console.log(err)
            navigate('/timeline')
        })
    }, [hashtag, navigate]);

    return(
        <>
            {posts.length > 0 ? posts.map((post, index) => <PostBox key={index} {...post} />)
            : <NoPostsMessage>There are no posts yet</NoPostsMessage>}
        </>
    );
}

const NoPostsMessage = styled.div`
    font-family: 'Lato', sans-serif;
    color: white;
    font-size: 20px;
`