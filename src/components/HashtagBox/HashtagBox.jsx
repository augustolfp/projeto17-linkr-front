import styled from "styled-components"
import { useEffect, useState } from "react";
import axios from "axios";
import { ReactTagify as Hashtag } from "react-tagify";

export function HashtagBox (){
    const [hashtags, setHashtags] = useState([]);

    useEffect( () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/hashtags`)

        .then( resp =>{
            setHashtags(resp.data);
        })
        .catch( err => {
            console.log(err);
        })
        
    }, []);

    function renderHashtags (){
        return hashtags.map( item  =>{
            return <Hashtag colors="white" tagClicked={(tag)=> alert(tag)}>
                {item.name}
            </Hashtag> })
    }

    return (
        <Container>
            <Title>trending</Title>

            <BoxList>
                {hashtags.length > 0 ? renderHashtags : "No hashtag found"}
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