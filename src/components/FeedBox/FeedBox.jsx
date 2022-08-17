import { useState, useContext, useEffect } from "react";
import userDataContext from "../../contexts/userDataContext";
import PostBox from "../PostBox/PostBox";
import PostBoxAuthor from "../PostBox/PostBoxAuthor";
import axios from "axios";
import PostCreator from "../PostCreator/PostCreator";
import styled from "styled-components";

export default function FeedBox(props) {
    const {userData} = useContext(userDataContext);
    const [feed, setFeed] = useState([]);
    const [reRender, setReRender] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const token = userData.token;

    useEffect(() => {
        console.log('teste do re-render')
        if(props.userId) {
            const feedRequest = axios.get(`${process.env.REACT_APP_API_URL}/feed/${props.userId}`, token);
            feedRequest.then(answer => {
                setFeed(answer.data);
            });
    
            feedRequest.catch(answer => {
                console.log(answer);
                alert("An error occured while trying to fetch the posts, please refresh the page");
            });
        }
        else {
            const feedRequest = axios.get(`${process.env.REACT_APP_API_URL}/feed`, token);
            feedRequest.then(answer => {
                setFeed(answer.data);
            });
    
            feedRequest.catch(answer => {
                console.log(answer);
                alert("An error occured while trying to fetch the posts, please refresh the page");
            });
        }

    }, [isDisabled, token, reRender]);


    return(
        <>
            { !props.userId && <PostCreator isDisabled={isDisabled} setIsDisabled={setIsDisabled} />}
            {feed.length > 0 ?
                feed.map((post, index) =>{
                    if(post.userid === userData.id){
                        return <PostBoxAuthor setReRender={setReRender} key={post.id} {...post}/>
                    } else {
                        return <PostBox key={post.id} {...post} />
                    }
                    })
                :  <NoPostsMessage> There are no posts yet</NoPostsMessage>       
            }

        </>
    );
}

const NoPostsMessage = styled.div`
    font-family: 'Lato', sans-serif;
    color: white;
    font-size: 20px;
`