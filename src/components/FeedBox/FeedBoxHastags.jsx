import { useState, useEffect, useContext } from "react";
import PostBox from "../PostBox/PostBox";
import userDataContext from "../../contexts/userDataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostBoxAuthor from "../PostBox/PostBoxAuthor";
import { NoPostsMessage } from "./styledComponents";

export default function FeedBoxHastags({hashtag}) {
    const { userData } = useContext(userDataContext);
    const [reRender, setReRender] = useState(0);
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
    }, [hashtag, navigate, reRender]);

    return(
        <>
            {posts.length > 0 ?
                posts.map((post, index) =>{
                    if(post.userid === userData.id){
                        return <PostBoxAuthor setReRender={setReRender} key={post.id} {...post} />
                    } else {
                        return <PostBox key={post.id} {...post} />
                    }
                    })
                    : 
                <NoPostsMessage>There are no posts yet</NoPostsMessage>}
        </>
    );
}