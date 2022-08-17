import { useState, useContext, useEffect } from "react";
import userDataContext from "../../contexts/userDataContext";
import PostBox from "../PostBox/PostBox";
import PostBoxAuthor from "../PostBox/PostBoxAuthor";
import axios from "axios";
import PostCreator from "../PostCreator/PostCreator";
import styled from "styled-components";
import useInterval from 'use-interval'
import { IoSync } from 'react-icons/io5'

export default function FeedBox(props) {
    const {userData} = useContext(userDataContext);
    const [feed, setFeed] = useState([]);
    const [reRender, setReRender] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const [notifyPosts, setNotifyPosts] = useState({ status: false});
    const token = userData.token;
    
    useInterval(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/feed`, token)
        .then( res =>{
            let countNewPosts = 0;
            const idsFeed = feed.map(item => item.id);
            const idsApi = res.data.map(item => item.id);

            if(idsApi.lenght < idsFeed.length){ return }

            idsApi.forEach(idApi => {
                const result = idsFeed.find(element => element === idApi);
                if(result === undefined){
                    countNewPosts++;
                }
            });

            if(countNewPosts > 0){
                setNotifyPosts({ status: true, value: countNewPosts});
            }})
        .catch(answer => {
            console.log(answer);
            });
    }, 5000);

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
    
    
    function updateFeed(){
        setNotifyPosts({status: false});
        setReRender(Math.random());
    }

    return(
        <>
           { !props.userId && <PostCreator isDisabled={isDisabled} setIsDisabled={setIsDisabled} />}

            {notifyPosts.status ?
                <Container onClick={updateFeed}>
                    <p>{notifyPosts.value} new posts, load more!</p><IoSync className="syncIco" color="white" fontSize='1.2em' />
                </Container>
                : ''
            }
            
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

const Container = styled.div`
    box-sizing: border-box;
    background-color: #1877F2;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-shadow: 1px 1px 3px black;
    cursor: pointer;
    gap: 5px;
    &:hover{
        filter: opacity(60%);
    }
    p{  
        color: white;
        font-family: 'Lato', cursive;
    }
    .syncIco{
        transform: rotate(100deg);
        animation: icoAnimation 2s;
        animation-delay: 2s;
        animation-iteration-count: infinite;
        @keyframes icoAnimation {
            from {transform: rotate(0deg);}
            to {transform: rotate(360deg);}
        }
    }
`