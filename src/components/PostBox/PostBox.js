import styled from "styled-components";
import { useState } from "react";
export default function PostBox() {
    const [postUrl, setPostUrl] = useState("");
    const [postDescription,setPostDescription] = useState("");
    function publishPost(event) {
        event.preventDefault();
    }

    return(
        <PostCreatorContainer>
            <h1>
            What are you going to share today?
            </h1>
            <form onSubmit={publishPost}>
                <input type="text" placeholder="url" onChange={e => setPostUrl(e.target.value)} required/>
               <input type="text" placeholder="descrição" onChange={e => setPostDescription(e.target.value)} required/>
               <button type="submit">PUBLISH</button>
            </form>
        </PostCreatorContainer>
    );
}

const PostCreatorContainer = styled.div`
    width: 610px;
    height: 80px;
    background-color: white;
    border-radius: 10px;
    padding: 18px;

    h1 {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        color: #707070;
        font-size: 20px;
    }
`

