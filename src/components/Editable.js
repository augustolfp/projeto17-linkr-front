import styled from "styled-components"
import { ReactTagify as Hashtag } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import userDataContext from "../contexts/userDataContext";
import axios from "axios";


export function Editable ({text, isEditing, setIsEditing, setNewText, newText, postId, setRender, currentText}){
    const [inputDisabled, setInputDisabled] = useState(false);
    const { userData } = useContext(userDataContext);
    const navigate = useNavigate();
    const token = { headers: { Authorization: `Bearer ${userData.token}`}};

    const tagStyle = {
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold'
    };

    function openHashtagScrenn(hashtag){
        navigate(`/hashtag/${hashtag.replace('#','')}`);
    }

    function handleKeyDown (event){
        const hashtags = getHashTags(newText);

        if(currentText === newText && event.key === 'Enter'){
            return setIsEditing(false)
        }

        if(event.key === 'Enter'){
           setInputDisabled(true);
           axios.patch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {newText, hashtags},token)

            .then( res =>{
                setInputDisabled(false);
                setIsEditing(false);
                setRender(Math.random());
                console.log(res);
            })

            .catch( err =>{
                setInputDisabled(false);
                alert('An error has occurred while try edit the post!');
                console.log(err);
            })
        }

        if(event.key === 'Escape'){
            setIsEditing(false);
            setNewText(text);
        }
    }
    
    function getHashTags(inputText) {  
        const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
        let hashtags = [];
        let match;
        while ((match = regex.exec(inputText))) {
            hashtags.push(match[1]);
        }
        return hashtags;
    }

    return(
        <Container onClick={ () =>setIsEditing(true) }>

            { isEditing ? 
            <textarea value={newText} type="text" onKeyDown={ event => handleKeyDown(event)}
            onChange={ e => setNewText(e.target.value)} autoFocus disabled={inputDisabled}/>
                :
            <Hashtag tagStyle={tagStyle} tagClicked={ hashtag => openHashtagScrenn(hashtag)}>
                <p>{`${text}`}</p>  
            </Hashtag> 
            }
            
        </Container>
    )
}

const Container = styled.div`
    color: white;

    textarea{
        border-radius: 5px;
        word-break: break-word;
        width: 95%;
        padding: 8px;
        height: 40px;
        border: none;
        resize: none;
    }
    textarea:disabled{
        background-color: lightgray;
    }
    textarea::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    }

`