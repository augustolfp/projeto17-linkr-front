import styled from "styled-components"

export const PostBoxContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    background-color: #171717;
    border-radius: 20px;
    padding: 15px;
    color: white;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    gap: 15px;
    @media (max-width: 670px) {
        border-radius: 0px;
    }
`

export const ProfilePhoto = styled.div`
    border-radius: 50%;
    background: ${props => props.image ? `url(${props.image})` : "white"};
    background-position: center;
    background-size: cover;
    width: 50px;
    height: 50px;
    background-color: red;
`

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    overflow: hidden;
    h2 {
        font-size: 19px;
    }
    p {
        font-size: 1em;
        color: #B7B7B7;
    }
    a {
        color: inherit;
        text-decoration: inherit;
    }
`

export const ThumbnailContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border: 1px solid darkgray;
    padding: 10px;
    border-radius: 10px;
`

export const ThumbnailTextContainer = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    h4 , h5, h6 {
        word-break: break-word;
        font-family: 'Lato', sans-serif;
    }

    h4 {
        font-size: 16px;
        color: #cecece;
    }

    h5 {
        font-size: 11px;
        color: #9B9595;
    }

    h6 {
        font-size: 11px;
        color: #cecece;
    }
`

export const ThumbnailPhoto = styled.div`
width: 150px;
background: ${props => props.image ? `url(${props.image})` : "white"};
background-position: center;
background-size: contain;
background-repeat: no-repeat;
`

export const ContainerPicture =styled.div`
display: flex;
flex-direction: column;
width: 50px;
`

