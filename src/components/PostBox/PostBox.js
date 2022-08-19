import { ReactTagify as Hashtag } from "react-tagify";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import CommentsBox from "../CommentsInterface/CommentsBox";
import { Oval } from  'react-loader-spinner';
import { useContext, useState } from "react";
import { ImLoop } from "react-icons/im";
import Modal from 'react-modal';
import {AiOutlineComment} from "react-icons/ai";

import { 
    PostBoxContainer,
    ContainerPicture,
    ProfilePhoto,
    ContentContainer,
    ThumbnailContainer,
    ThumbnailTextContainer,
    ThumbnailPhoto,
    CommentAndPostContainer,
    IconsMenu,
    CommentsIcon,
    ModalStyle,
    customStylesModal
 } from "./styledComponents";
import axios from "axios";
import userDataContext from "../../contexts/userDataContext";




Modal.setAppElement('.root');
export default function PostBox(props) {
    const navigate = useNavigate();
    const [visibleComments, setVisibleComments] = useState(false);
    const { userData } = useContext(userDataContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = { headers: { Authorization: `Bearer ${userData.token}`}};

    const tagStyle = {
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        cursor: 'pointer',
    };

    function openHashtagScrenn(hashtag){
        navigate(`/hashtag/${hashtag.replace('#','')}`);
    }

    function toggleModal(){ setIsOpen(!modalIsOpen) }

    function closeModal(){  setIsOpen(false) }

    function rePost(){
        axios.post(`${process.env.REACT_APP_API_URL}/repost/${props.id}`, '',token)

        .then( res  =>{
            toggleModal(res)
        })

        .catch( err  =>{
            console.log(err)
        })
    }


    
    return(
        <CommentAndPostContainer>
        
            <PostBoxContainer>
               <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStylesModal} >
                  <ModalStyle>
                    {
                        loading ? <Oval height={50} width={50} color="#1877F2" secondaryColor="#fff" strokeWidth={3}/>
                        :
                        <>
                            <h2>Do you want to re-post this link?</h2>

                            <div className="buttons" >
                                <button style={{ color: '#1877F2'}}
                                onClick={toggleModal}
                                className="button">No, cancel</button>

                                <button style={{ backgroundColor: '#1877F2', color: '#FFF'}}
                                onClick={ () =>{rePost()}}
                                className="button">Yes, share!</button>
                            </div>
                        </>
                    }
                  </ModalStyle>
                </Modal>
                
                <ContainerPicture>
                    <ProfilePhoto image={props.userPictureUrl}></ProfilePhoto>
                    
                    <CommentsIcon onClick={() => setVisibleComments(!visibleComments)}>
                        <AiOutlineComment />
                        <h4>Comments</h4>
                    </CommentsIcon>
                    
                    <RepostBox onClick={toggleModal}>
                        <ImLoop/>
                        <span>{props.reposts} re-posts</span>
                    </RepostBox>
                    
                </ContainerPicture>
                
                <ContentContainer>
                    <Link to={`/user/${props.userid}`}>
                        <h2 className="userName">{props.username}</h2>
                    </Link>

                    <Hashtag tagStyle={tagStyle} tagClicked={ hashtag => openHashtagScrenn(hashtag)}>
                        <p className="text" >{`${props.text}`}</p>  
                    </Hashtag>

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
            {visibleComments && <CommentsBox postId={props.id} />}
        </CommentAndPostContainer>
    );
}

export const RepostBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
        font-family: 'Lato', cursive;
        font-size: 11px;
        font-weight: bold;
    }
    &:hover{
        filter: opacity(60%);
        cursor: pointer;
    }
`
