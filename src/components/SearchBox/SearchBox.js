import styled from "styled-components";
import { useState, useEffect } from "react";
import {DebounceInput} from 'react-debounce-input';
import axios from "axios";

export default function SearchBox() {
    const [searchTerm, setSearchTerm]  = useState("");

    useEffect(() => {
        if(searchTerm != "") {
            axios.get(`${process.env.REACT_APP_API_URL}/search/${searchTerm}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [searchTerm]);

    return(
        <DebounceInput minLength={3} debounceTimeout={300} value={searchTerm} placeholder="Search for people" onChange={e => setSearchTerm(e.target.value)} />
    );
}

const SearchInput = styled.input`
    width: 560px;
    height: 46px;
    border-radius: 8px;
    border-style: none;
    background-color: white;
    font-family: 'Lato', sans-serif;
    color: #c6c6c6;
    font-size: 19px;
    padding: 0px 14px;

`