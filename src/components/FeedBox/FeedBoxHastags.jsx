import { useState, useEffect, useContext } from "react";
import PostBox from "../PostBox/PostBox";
import userDataContext from "../../contexts/userDataContext";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PostBoxAuthor from "../PostBox/PostBoxAuthor";

export default function FeedBoxHastags({hashtag}) {
    const { userData } = useContext(userDataContext);
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
            {posts.length > 0 ?
                posts.map((post, index) =>{
                    if(post.userid === userData.id){
                        return <PostBoxAuthor key={post.id} {...post} />
                    } else {
                        return <PostBox key={post.id} {...post} />
                    }
                    })
                    : 
                <NoPostsMessage>There are no posts yet</NoPostsMessage>}
        </>
    );
}

const NoPostsMessage = styled.div`
    font-family: 'Lato', sans-serif;
    color: white;
    font-size: 20px;
`