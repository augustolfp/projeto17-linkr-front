import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import userDataContext from "../../contexts/userDataContext";
import axios from "axios";

export default function FeedBox() {
    const {userData} = useContext(userDataContext);
    const [feed, setFeed] = useState([]);
    const token = userData.token;

    useEffect(() => {
        const feedRequest = axios.get(`${process.env.REACT_APP_API_URL}/feed`, token);

        feedRequest.then(answer => {
            setFeed(answer.data);
            console.log(answer.data);
        });

        feedRequest.catch(answer => console.log(answer));

    }, []);

    return(
        <h1>Nada ainda</h1>
    );
}