import { useContext, useState } from "react";
import { Oval } from  'react-loader-spinner';
import { Link } from "react-router-dom";
import { Editable } from "../Editable";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import userDataContext from '../../contexts/userDataContext';
import Modal from 'react-modal';
import axios from "axios";
import styled from "styled-components";
import { 
    PostBoxContainer,
    ContainerPicture,
    ProfilePhoto,
    ContentContainer,
    ThumbnailContainer,
    ThumbnailTextContainer,
    ThumbnailPhoto
 } from "./styledComponents";


Modal.setAppElement('.root');
export default function PostBoxAuthor(props) {
    const [newText, setNewText] = useState(props.text);
    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const {userData} = useContext(userDataContext);
    const [loading, setLoading] = useState(false);
    const postId = props.id;

    function openEditing (){
        setIsEditing(!isEditing);
        setNewText(props.text);
    }

    function deletePost (){
        setLoading(!loading);
        axios.delete(`${process.env.REACT_APP_API_URL}/delete/${postId}`, {headers: { Authorization: `Bearer ${userData.token}`}})

        .then( resp => {
            setLoading(!loading);
            toggleModal();
            props.setReRender(Math.random());
        })

        .catch( err => {
            setLoading(!loading);
            toggleModal();
            alert('An error occurred while deleting post!');
            console.log(err)
        })
    }

    function toggleModal(){ setIsOpen(!modalIsOpen) }

    function closeModal(){  setIsOpen(false) }

    const customStyles = {
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

    return(
        <PostBoxContainer>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} >
                <ModalStyle>
                    {
                        loading ? <Oval height={50} width={50} color="#1877F2" secondaryColor="#fff" strokeWidth={3}/>
                        :
                        <>
                            <h2>Are you sure you want to delete this post?</h2>

                            <div className="buttons" >
                                <button style={{ color: '#1877F2'}}
                                onClick={toggleModal}
                                className="button">No, go back</button>

                                <button style={{ backgroundColor: '#1877F2', color: '#FFF'}}
                                onClick={ () =>{deletePost()}}
                                className="button">Yes, delete it</button>
                            </div>
                        </>
                    }
                </ModalStyle>
            </Modal>

            <ContainerPicture>
                <ProfilePhoto image={props.userPictureUrl}></ProfilePhoto>
            </ContainerPicture>

            <ContentContainer>

                <BoxUsernameAndMenu>
                    <Link to={`/user/${props.userid}`}><h2>{props.username}</h2></Link>
                    <IconsMenu>
                        <IoMdCreate className="icon" color= "white" size="1.2em" onClick={openEditing}/>
                        <IoMdTrash className="icon" color= "white" size="1.2em" onClick={toggleModal}/>
                    </IconsMenu>
                </BoxUsernameAndMenu>

                <Editable text={props.text}
                setNewText={setNewText}
                newText={newText}
                currentText={props.text}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                postId={props.id}
                setRender={props.setReRender}/>

                <a href={props.url} target="_blank" rel="noreferrer">
                    <ThumbnailContainer>
                        <ThumbnailTextContainer>
                            <h4>{props.urlTitle}</h4>
                            <h5>{props.urlDescription}</h5>
                            <h6>{props.url}</h6>
                        </ThumbnailTextContainer>
                        <ThumbnailPhoto image={props.urlThumbnail}></ThumbnailPhoto> 
                    </ThumbnailContainer>
                </a>

            </ContentContainer>

        </PostBoxContainer>
    );
}



const ModalStyle = styled.div`
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

const BoxUsernameAndMenu = styled.div`
    display: flex;
    justify-content: space-between;
`

const IconsMenu = styled.div`
    display: flex;
    gap: 5px;
    .icon{
        cursor: pointer;
    }
    .icon:hover{
        fill-opacity: calc(60%);
    }
`