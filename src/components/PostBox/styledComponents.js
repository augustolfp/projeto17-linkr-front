import styled from "styled-components"

export const PostBoxContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    background-color: #171717;
    padding: 15px;
    color: white;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    gap: 15px;
    border-radius: 16px;
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
    margin-bottom: 8px;
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
    gap: 15px;
    align-items: center;
`

export const RepostBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
        font-family: 'Lato', cursive;
        font-size: 11px;
        font-weight: bold;
    }
`

export const ModalStyle = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-top: 10%;
    color: white;
    width: 100%;
    height: 100%;
    align-items: center;
    gap: 20px;
    h2{
        font-weight: bold;
        font-family: 'Lato';
        text-align: center;
    }
    .buttons{
        display: flex;
        gap: 10px;
        color: white; 
    }
    .button{
        box-sizing: border-box;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        font-family: 'Lato';
    }
`
export const customStylesModal = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#333",
      borderRadius: "50px",
      width: '60%',
      height: '30%',
      overflow: 'hidden'
    },
    overlay: {zIndex: 1000}
};

export const IconsMenu = styled.div`
    display: flex;
    gap: 5px;
    .icon{
        cursor: pointer;
    }
    .icon:hover{
        fill-opacity: calc(60%);
    }
`

export const CommentsIcon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    h4 {
        font-family: 'Lato', sans-serif;
        font-size: 11px;
    }
    > svg {
            width: 25px;
            height: 25px;
        }
`

export const CommentAndPostContainer = styled.div`
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #1e1e1e;
`

