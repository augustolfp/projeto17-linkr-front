import styled from "styled-components";
import { useState, useEffect } from "react";
import {DebounceInput} from 'react-debounce-input';
import axios from "axios";
import { Link } from "react-router-dom";

export default function SearchBox() {
    const [searchTerm, setSearchTerm]  = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        if(searchTerm !== "") {
            axios.get(`${process.env.REACT_APP_API_URL}/search/${searchTerm}`)
            .then(res => {
                setSearchResults(res.data);
                console.log(searchResults);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [searchTerm]);

    function handleResults() {
        if(searchResults.length > 0 && searchTerm.length >= 3) {
            return(
                searchResults.map((result, index) =>
                    <Link to={`/user/${result.id}`} key={index}>
                        <UserResultThumbnail>
                            <ProfilePhoto image={result.pictureUrl}></ProfilePhoto>
                            {result.username}
                        </UserResultThumbnail>
                    </Link>)
            );
        }

        if(searchResults.length === 0 && searchTerm.length >=3) {
            return(
                <UserResultThumbnail>No results!</UserResultThumbnail>
            );
        }
    }

    return(
        <Container>
            <SearchInterface>
                <DebounceInput minLength={3} debounceTimeout={300} value={searchTerm} placeholder="Search for people" onChange={e => setSearchTerm(e.target.value)} />
                <SearchResultBox>
                    {handleResults()}
                </SearchResultBox>
            </SearchInterface>
        </Container>
    );
}

const SearchInterface = styled.div`
    position: absolute;
    top: 0;
    background: #E7E7E7;
    border-radius: 8px;

    input {
        box-sizing: border-box;
        width: 30vw;
        height: 46px;
        border-radius: 8px;
        border-style: none;
        background-color: white;
        font-family: 'Lato', sans-serif;
        color: #c6c6c6;
        font-size: 19px;
        padding: 0px 14px;
    }
`

const SearchResultBox = styled.div`
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    color: #515151;

    a {
        color: inherit;
        text-decoration: inherit;
    }
`

const ProfilePhoto = styled.div`
    border-radius: 50%;
    background: ${props => props.image ? `url(${props.image})` : "white"};
    background-position: center;
    background-size: cover;
    width: 39px;
    height: 39px;
    margin-right: 12px;
`

const UserResultThumbnail = styled.div`
    margin: 10px;
    display: flex;
    align-items: center;
`

const Container = styled.div`
    position: relative;
    width: 40vw;
    height: 46px;
`