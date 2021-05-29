/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Map from "../../Components/MapContainer";
import Beach from "../../images/beach2.jpg";
import Beach2 from "../../images/beach.jpg";
import Airplane from "../../images/airplane.jpg";
import MainImage from "../../images/1.jpg";
import ResultImg from "../../images/결과.PNG";
const { kakao } = window;

const Container = styled.div`
    position: absolute;
    top: 65px;
    left: 0;
    width: 100%;
`;

const Item = styled.div`
    margin-bottom:30px;
`;
const SectionTitle = styled.span`
    margin-top:20px;
    font-size:23px;
    font-weight:600;
`;
const Cover = styled.div`
    position:absolute;
    background-image: url(${props => props.small});
    width: 100%;
    height: 400px;
    @media only screen and (min-width: 800px) {
        height: 600px;
    }

    @media only screen and (min-width: 1280px) {
        background-image: url(${props => props.medium});
        height: 800px;
    }

    @media only screen and (min-width: 2000px) {
        background-image: url(${props => props.large});
        height: 1000px;
    }

    opacity: 0.3;
    z-index: -1;
`;
const Wrap = styled.div`
    margin: 0 auto;
    max-width: 1280px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainImg = styled.li`
    width: 150px;
    & img {
        width: 100%;
        height: auto;
    }
`;
const MainText = styled.p`
    font-family: "Noto Sans", sans-serif;
    font-size: 20px;
    font-weight: 600;
    margin: 30px 0;
    line-height: 1.5;
`;


const First = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    flex-direction: column;

    & ${Wrap} {
        flex-direction: column;
    }

    @media only screen and (min-width: 800px) {
        height: 600px;

        ${MainImg} {
            width: 250px;
        }
     
        ${MainText} {
            font-size: 26px;
        }
    }

    @media only screen and (min-width: 1280px) {
        height: 800px;
        ${MainImg} {
            width: 350px;
        }
      
        ${MainText} {
            font-size: 38px;
        }
    }

    @media only screen and (min-width: 2000px) {
        height: 1000px;
        ${MainImg} {
            width: 450px;
        }
        ${MainText} {
            font-size: 50px;
        }
    }
`;

const RotateHolder = styled.div`
    position: relative;
    width: 140px;
    height: 210px;
`;

const Image = styled.img`
    width: 200px;
    height: auto;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;

    &:not(:last-child) {
        border-top: 10px solid #303030;
        border-bottom: 10px solid #303030;
    }

    @media only screen and (min-width: 800px) {
        height: 400px;
        ${RotateHolder} {
            width: 200px;
            height: 270px;
        }
        ${MainText} {
            font-size: 26px;
        }
        ${Image} {
            width: 400px;
        }
    }

    @media only screen and (min-width: 1280px) {
        height: 600px;
        ${RotateHolder} {
            width: 250px;
            height: 320px;
        }
        ${MainText} {
            font-size: 30px;
        }
        ${Image} {
            width: 400px;
        }
    }

    @media only screen and (min-width: 2000px) {
        height: 700px;
        ${RotateHolder} {
            width: 300px;
            height: 370px;
        }
        ${MainText} {
            font-size: 50px;
        }
        ${Image} {
            width: 320px;
        }
    }

    & ${Wrap} {
        justify-content: space-between;
        width: 100%;
        max-width: 1100px;
    }
`;

const RotateImage = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bg});
    top: 0;
    left: 0;
    background-size: 300px;
    background-position-x: center;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 10px 0px #E50914;
    &:nth-child(1) {
        z-index: 10;
        animation: rotate1 12s ease-in-out infinite;
    }
    &:nth-child(2) {
        z-index: 0;
        animation: rotate2 12s ease-in-out infinite;
    }

    @keyframes rotate1 {
        0% {
            z-index: 10;
            transform: perspective(800px) rotateY(0deg);
        }
        50% {
            z-index: 0;
            transform: perspective(800px) rotateY(180deg);
        }
        100% {
            z-index: 10;
            transform: perspective(800px) rotateY(360deg);
        }
    }

    @keyframes rotate2 {
        0% {
            z-index: 0;
            transform: perspective(800px) rotateY(180deg);
        }
        50% {
            z-index: 10;
            transform: perspective(800px) rotateY(360deg);
        }
        100% {
            z-index: 0;
            transform: perspective(800px) rotateY(540deg);
        }
    }
`;


const Home = () => {
    return (
        <Container>
            <Helmet>
                <title>Yeohang Ottae</title>
            </Helmet>
            <Cover
                small={Beach}
                medium={Beach}
                large={Beach}
                bgImage={Beach}
            >
            </Cover>
            <First>
                <Wrap>
                    <MainImg>
                        <img src={MainImage} />
                    </MainImg>
                    <MainText>
                        여행 어때?!?
                    </MainText>
                    <MainText>
                        여행지 추천 애플리케이션
                    </MainText>
                </Wrap>
            </First>
            <Content>
                <Wrap>
                    <MainText>
                        Questions<br /><br />
                            질문을 통해<br />
                            원하는 여행지를<br />
                            추천해줍니다.
                    </MainText>
                    <RotateHolder>
                        <RotateImage bg={Airplane} />
                        <RotateImage bg={Beach2} />
                    </RotateHolder>
                </Wrap>
            </Content>
            <Content>
                <Wrap>
                    <Image src={ResultImg} />
                    <MainText>
                        주변 관광지<br /><br />
                            내 위치정보를 통해<br />
                            무작위로 여행지를<br />
                            추천해줍니다.
                        </MainText>
                </Wrap>
            </Content>
        </Container>
    )

}

export default Home;