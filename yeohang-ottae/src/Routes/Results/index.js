import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
// import SightsApi from "../../Api/api"


const Container = styled.div`
    height:calc(100vh - 50px);
    width:100%;
    padding:50px;
`;
const Content = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    position:relative;
    z-index:1;
    /* height:100%; */
`;
const Cover = styled.div`
    width:400px;
    background-image:url(${props => props.bgImage});
    background-position:center center;
    background-size:cover;
    height:600px;
    display:block;
    position:fixed;
    top:70px;
    left:30px; 
`;
const WeatherContanier = styled.div`
    width:300px;
    height: 150px;
    display:grid;
    position:fixed;
    grid-template-columns: repeat(2, 1fr);
    top:700px;
    left:40px;
    justify-content:space-between;
    align-items: center;
    /* background-color:rgba(255,255,255,0.6); */
    padding:10px;
    color:white;
`;
const WeatherDiv = styled.div`
    display: flex;
    flex-direction: column;
    font-size:16px;
`;
const WeatherIcon = styled.div`
    width:50px;
    background-image:url(${props => props.bgImage});
    background-position:center center;
    background-size:cover;
    height:60px;
    font-size:18px;
    display: flex;
    margin-left:30px;
    
`;
const WeatherSpan = styled.span`
    margin-bottom:15px;
`;
const InfoTitle = styled.span`
    color:black;
    font-size:12px;
`;
const Data = styled.div`
    width :70%;
    margin-left: 400px;
`;

const Title = styled.h3`
    font-size:35px;
    font-weight:600;
    /* margin-bottom:20px; */
`;
const ItemContainer = styled.div`
    margin:20px 0;
`;
const Item = styled.span`
    font-size:18px;
`;
const Divider = styled.span`
    font-size:25px;
    margin:0 10px;
`;
const SectionTitle = styled.span`
    margin-top:20px;
    font-size:23px;
    font-weight:600;
`;
const SectionHr = styled.hr`
    margin-top:15px;
`;

const ResetBtn = styled.button``;


const useLoad = () => {
    const [results, setResults] = useState([]);
    const [randomNum, setRandomNum] = useState(null);
    const [data, setData] = useState([]);
    const [click, setClick] = useState(false);
    const [currentWeather, setCurrentWeather] = useState({});
    const [loading, setLoading] = useState(true);
    const onClick = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (click == true) {
            setClick(false);
        }
        else if (click == false) {
            setClick(true);
        }
    }
    const sendXY = async () => {
        console.log(data);
        const XY = {
            x: data.mapx,
            y: data.mapy,
        };
        console.log(XY);
        await axios.post('/weather', XY)
            .then((res) => {
                // console.log(res.data);
            }).then((err) => {
                console.log(err);
            }).then(() => {
                console.log(data.mapx, data.mapy);
                LoadWeather();
            })
    }
    const LoadWeather = async () => {
        try {
            console.log("weather");
            const currentWeather = await axios.get('/weather');
            console.log(currentWeather.data);
            const data = currentWeather.data;
            const currentData = {
                temp: data.temp,
                feels_like: data.feels_like,
                humidity: data.humidity,
                state: data.state,
                icon: data.icon
            }
            setCurrentWeather(currentData);
        } catch {
            console.log("err");
        } finally {
            setLoading(false);
        }
    }
    const LoadData = async () => {
        try {
            const results = await axios.get('/sights');
            const size = results.data.length;
            const randomNum = Math.floor(Math.random() * size) + 1;
            for (let i = 1; i <= size; i++) {
                if (i == randomNum) {
                    // setData(results.data[i - 1]);
                    // console.log(results.data[i - 1]);
                    setData(results.data[i - 1]);
                }
            }
        } catch {
            console.log("err");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        // console.log(data);
        LoadData();
        if (data.mapx != null) {
            sendXY();
            LoadWeather();
        }
    }, [click]);
    return { loading, results, randomNum, onClick, data, currentWeather };
}



const Results = () => {
    const { loading, results, randomNum, onClick, data, currentWeather } = useLoad();
    console.log(currentWeather);
    return (
        loading ? (
            <>
                <Helmet><title>Result | Yeohang-ottae</title></Helmet>
                <Loader />
            </>
        ) : (
            <Container>
                <Helmet><title>Result | Yeohang-ottae</title></Helmet>
                {/* <Content>
                    <Cover bgImage={ }></Cover>
                </Content> */}
                <Content>
                    <>
                        <Cover bgImage={data.image != " " ? data.image : require("../../images/NotFound.PNG").default} />
                        <WeatherContanier>
                            <WeatherDiv>
                                <WeatherSpan>현재 온도 : {currentWeather.temp} ℃</WeatherSpan>
                                <WeatherSpan>체감 온도 : {currentWeather.feels_like} ℃</WeatherSpan>
                                <WeatherSpan>습도 : {currentWeather.humidity} %</WeatherSpan>

                            </WeatherDiv>

                            <WeatherIcon bgImage={` http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}>
                                <WeatherSpan>{currentWeather.state}</WeatherSpan>
                            </WeatherIcon>
                        </WeatherContanier>

                        <Data>
                            <ResetBtn onClick={onClick}>reset</ResetBtn>
                            <SectionHr></SectionHr>
                            <Title>{data.title}</Title>

                            <ItemContainer>
                                <Item>{data.type}</Item>
                                <Divider>  ·  </Divider>
                                <Item>{data.detail}</Item>
                                <Divider>  ·  </Divider>
                                <Item>{data.location}</Item>
                                <Divider>  ·  </Divider>
                                <Item>{data.address}</Item>
                                {data.tel && data.tel.length > 1 && (
                                    <>
                                        <Divider>  ·  </Divider>
                                        <Item>{data.tel}</Item>
                                    </>
                                )}
                            </ItemContainer>
                        </Data>
                        {/* <SectionTitle>{results[i].type}</SectionTitle> */}
                    </>
                </Content>


            </Container>
        ));
}


export default Results;