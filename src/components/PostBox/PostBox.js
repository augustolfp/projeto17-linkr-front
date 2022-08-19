import { ReactTagify as Hashtag } from "react-tagify";
import { useNavigate, Link } from "react-router-dom";
import CommentsBox from "../CommentsInterface/CommentsBox";
import {AiOutlineComment} from "react-icons/ai";
import { useState } from "react";
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
    CommentsIcon
 } from "./styledComponents"

export default function PostBox(props) {

    const navigate = useNavigate();
    const [visibleComments, setVisibleComments] = useState(false);


    const tagStyle = {
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold'
    };

    function openHashtagScrenn(hashtag){
        navigate(`/hashtag/${hashtag.replace('#','')}`);
    }

    return(
        <CommentAndPostContainer>
            <PostBoxContainer>
                <ContainerPicture>
                    <ProfilePhoto image={props.userPictureUrl}></ProfilePhoto>
                    <CommentsIcon onClick={() => setVisibleComments(!visibleComments)}>
                        <AiOutlineComment />
                        <h4>Comments</h4>
                    </CommentsIcon>
                </ContainerPicture>
                <ContentContainer>
                    <Link to={`/user/${props.userid}`}>
                        <h2>{props.username}</h2>
                    </Link>

                    <Hashtag tagStyle={tagStyle} tagClicked={ hashtag => openHashtagScrenn(hashtag)}>
                        <p>{`${props.text}`}</p>  
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
