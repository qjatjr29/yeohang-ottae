import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Map from "../../Components/MapContainer";
import { Link } from "react-router-dom";

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
    top:100px;
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


const useMyLocationSights = () => {
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
    const Geolocation_success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordsObject = {
            "latitude": latitude, "longitude": longitude
            // latitude, longitude
        };
        // console.log(latitude, longitude);
        sendXY(latitude, longitude);
    }
    const Geolocation_fail = () => {
        console.log("fail!");
    }
    const askforCoords = () => {
        navigator.geolocation.getCurrentPosition(Geolocation_success, Geolocation_fail);
    }
    const sendXY = async (x, y) => {
        console.log(data);
        const XY = {
            x: x,
            y: y,
        };
        console.log(XY);
        await axios.post('/myLocation', XY)
            .then((res) => { })
            .then((err) => {
                console.log(err);
            }).then(() => {
                LoadData();
            })
    }
    const sendXYtoWeather = async (x, y) => {
        console.log(data);
        const dataXY = {
            x: x,
            y: y,
        };
        console.log(dataXY);
        await axios.post('/myLocation', dataXY)
            .then((res) => { })
            .then((err) => {
                console.log(err);
            }).then(() => {
                LoadData();
            })
    }
    const LoadWeather = async () => {
        try {
            console.log("weather");
            const currentWeather = await axios.get('/weather');
            console.log(currentWeather.data);
            const weatherdata = currentWeather.data;
            const currentData = {
                temp: weatherdata.temp,
                feels_like: weatherdata.feels_like,
                humidity: weatherdata.humidity,
                state: weatherdata.state,
                icon: weatherdata.icon
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
            const results = await axios.get('/myLocation');
            const size = results.data.length;
            const randomNum = Math.floor(Math.random() * size) + 1;
            for (let i = 1; i <= size; i++) {
                if (i == randomNum) {
                    // setData(results.data[i - 1]);
                    // console.log(results.data[i - 1]);
                    setData(results.data[i - 1]);
                    console.log(results.data[i - 1].mapx);
                    if (results.data[i - 1].mapx) {
                        // console.log(data.mapx);
                        sendXYtoWeather(results.data[i - 1].mapx, results.data[i - 1].mapy);
                        LoadWeather();
                    }
                }
            }
        } catch {
            console.log("err");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {

        askforCoords();
        // console.log(data);
        // if (data.mapx != null) {
        //     sendXY();
        //     LoadWeather();
        // }
    }, [click]);
    return { loading, results, randomNum, onClick, data, currentWeather };
}

const MyLocation = () => {
    const { loading, results, randomNum, onClick, data, currentWeather } = useMyLocationSights();
    return (
        loading ? (
            <>
                <Helmet><title>내 주변 관광지 | Yeohang-ottae</title></Helmet>
                <Loader />
            </>
        ) : (
            <Container>
                <Helmet><title>내 주변 관광지 | Yeohang-ottae</title></Helmet>
                {data && data.id ? (
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
                                    <Item>{data.address}</Item>
                                    {data.tel && data.tel.length > 1 && (
                                        <>
                                            <Divider>  ·  </Divider>
                                            <Item>{data.tel}</Item>
                                        </>
                                    )}
                                </ItemContainer>
                                <div>
                                    <SectionTitle>Map</SectionTitle>
                                    <SectionHr></SectionHr>
                                    <Content>
                                        <Map key={data.id} lat={data.mapy} lon={data.mapx} />
                                    </Content>
                                </div>
                            </Data>
                            {/* <SectionTitle>{results[i].type}</SectionTitle> */}
                        </>
                    </Content>
                ) :
                    (
                        <Content>
                            <Data>검색 결과가 없습니다. 다시 돌아가 검색해 주세요.</Data>
                            <Link to='/Sights'>
                                <div>돌아가기</div>
                            </Link>
                        </Content>
                    )
                }
                {/* <Content>
                    <Cover bgImage={ }></Cover>
                </Content> */}
            </Container>
        ));
}

export default MyLocation;