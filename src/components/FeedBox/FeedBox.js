import { useState, useContext, useEffect } from "react";
import userDataContext from "../../contexts/userDataContext";
import PostBox from "../PostBox/PostBox";
import axios from "axios";
import PostCreator from "../PostCreator/PostCreator";
import styled from "styled-components";

export default function FeedBox() {
    const {userData} = useContext(userDataContext);
    const [feed, setFeed] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const token = userData.token;

    useEffect(() => {
        const feedRequest = axios.get(`${process.env.REACT_APP_API_URL}/feed`, token);

        feedRequest.then(answer => {
            setFeed(answer.data);
            console.log(answer.data);
        });

        feedRequest.catch(answer => {
            console.log(answer);
            alert("An error occured while trying to fetch the posts, please refresh the page");
        });

    }, [isDisabled, token]);

    return(
        <>
            <PostCreator isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
            {
                feed.length > 0 ? (
                    feed.map((post, index) => <PostBox key={index} {...post} />)
                ) : (
                    <NoPostsMessage>
                        There are no posts yet
                    </NoPostsMessage>
                )
            }
        </>
    );
}

const NoPostsMessage = styled.div`
    font-family: 'Lato', sans-serif;
    color: white;
    font-size: 20px;
`