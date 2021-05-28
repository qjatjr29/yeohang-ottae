import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Container = styled.div`
    font-size:12px;
`;


const Image = styled.div`
    background-image:url(${props => props.bgUrl});
    height: 150px;
    
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    margin-bottom: 5px;
    transition: opacity 0.1s linear;
`;
const ImageContainer = styled.div`
    margin-bottom: 5px;
    position: relative;
        &:hover{
        ${Image} {
            opacity: 0.3;
        }
    }
`;
const Name = styled.span`
    display: block;
    margin-bottom: 3px;
`;

const TextDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Poster = ({ id, image, title, detail, location }) => (
    // <Link to={isMovie ? `/movie/${id}` : `/show/${id} `}>
    <Container>
        <ImageContainer>
            <Image bgUrl={image != " " ? image : require("../images/NotFound.PNG").default} />
        </ImageContainer >
        <TextDiv>
            {/* <Name>{title}</Name> */}
            <Name>{title.length > 12 ? `${title.substring(0, 15)}...` : title}</Name>
            {detail && (
                <Name>{detail}</Name>
                // <Name>{location.length > 15 ? `${location.substring(0, 15)}...` : location}</Name>
            )}
            {/* <Name>{detail.length > 15 ? `${detail.substring(0, 15)}...` : detail}</Name> */}
            {location && (
                <Name>{location}</Name>
                // <Name>{location.length > 15 ? `${location.substring(0, 15)}...` : location}</Name>
            )}
        </TextDiv>

    </Container >
    // </Link >
);



Poster.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    location: PropTypes.bool.isRequired
}

export default Poster;