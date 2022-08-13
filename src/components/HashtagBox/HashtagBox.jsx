import styled from "styled-components"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactTagify as Hashtag } from "react-tagify";

export function HashtagBox (){
    const [hashtags, setHashtags] = useState([]);
    const navigate = useNavigate();

    useEffect( () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/hashtags`)

        .then( resp =>{
            setHashtags(resp.data);
        })
        .catch( err => {
            console.log(err);
        })
        
    }, []);

    function openHashtag (hashtag){
        const hashtagFilter = hashtag.replace("#", "");
        navigate(`/hashtag/${hashtagFilter}`);
    }

    const tagStyle = {
        color: 'white',
        cursor: 'pointer'
    };

    return (
        <Container>
            <Title>trending</Title>

            <BoxList>

                {
                hashtags.length > 0 ?
                hashtags.map( (item, index) =>
                <Hashtag key={index} tagStyle={tagStyle} tagClicked={ hashtag => openHashtag(hashtag)}>
                    {`#${item}`}
                </Hashtag> ) : "No hashtag found!"
                }

            </BoxList>

        </Container>
    )
}


const Container = styled.div`
    div, ul {
        box-sizing: border-box;
        padding: 20px 15px;
    }
    height: fit-content;
    width: 100%;
    max-width: 300px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    border-radius: 20px;
    overflow: hidden;
`

const Title = styled.div`
    background-color: #171717;
    color: white;
    font-family: 'Oswald';
    font-size: 1.5em;
    font-weight: bold;
    width: 100%;
`

const BoxList = styled.ul`
    background-color: #171717;
    color: white;
    font-family: 'Lato', cursive;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    gap: 12px;
`