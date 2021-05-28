import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Map from "../../Components/MapContainer";
import { Link } from "react-router-dom";
import Poster from "../../Components/Poster";

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
const Others = styled.div`
    height: 270px;
    display: grid;
    gap: 50px;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: 10%;
    overflow-x: auto;
`;
const ResetBtn = styled.button``;


const useLoad = (sightX, sightY) => {
    const [results, setResults] = useState([]);
    const [randomNum, setRandomNum] = useState(null);
    const [data, setData] = useState([]);
    const [click, setClick] = useState(false);
    const [currentWeather, setCurrentWeather] = useState({});
    const [loading, setLoading] = useState(true);
    const [others, setOthers] = useState([]);
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
    const sendToRestaurantServer = async (sightX, sightY) => {
        const sightXY = {
            x: sightX,
            y: sightY,
        }
        await axios.post('/restaurant', sightXY)
            .then((res) => {
                // console.log(res.data);
            }).then((err) => {
                console.log(err);
            }).then(() => {
                // console.log(data.mapx, data.mapy);
                LoadRestaurant();
            })
    }
    const sendXY = async (x, y) => {
        console.log(data);
        const XY = {
            x: x,
            y: y,
        };
        console.log(XY);
        await axios.post('/weather', XY)
            .then((res) => {
                // console.log(res.data);
            }).then((err) => {
                console.log(err);
            }).then(() => {
                // console.log(data.mapx, data.mapy);
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
    const LoadRestaurant = async () => {
        try {
            const results = await axios.get('/restaurant');
            const size = results.data.length;
            const randomNum = Math.floor(Math.random() * size) + 1;
            var otherRandomNums = [];
            for (let j = 0; j < 5; j++) {
                const otherRandom = Math.floor(Math.random() * size) + 1;
                while (1) {
                    if (randomNum != otherRandom) {
                        otherRandomNums.push(otherRandom);
                        break;
                    }
                    otherRandom = Math.floor(Math.random() * size) + 1;
                }
            }
            otherRandomNums.sort((a, b) => {
                if (a > b) return 1;
                if (a == b) return 0;
                if (a < b) return -1;
            })
            console.log(otherRandomNums);
            var count = 0;
            var otherRestaurant = [];
            for (let i = 1; i <= size; i++) {
                var cmpNum = otherRandomNums[count];
                if (i == randomNum) {
                    // setData(results.data[i - 1]);
                    // console.log(results.data[i - 1]);
                    setData(results.data[i - 1]);
                    console.log(results.data[i - 1].mapx);
                    if (results.data[i - 1].mapx) {
                        // console.log(data.mapx);
                        sendXY(results.data[i - 1].mapx, results.data[i - 1].mapy);
                        LoadWeather();
                    }
                }
                else if (randomNum != cmpNum && cmpNum == i) {

                    otherRestaurant.push(results.data[i - 1]);

                    count = count + 1;
                }
            }
            setOthers(otherRestaurant);
        } catch {
            console.log("err");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        sendToRestaurantServer(sightX, sightY);
    }, [click]);
    return { loading, results, randomNum, onClick, data, currentWeather, others };
}


const Restaurant = ({ location }) => {
    // console.log(location);
    const x = location.state.x;
    const y = location.state.y;
    // console.log(x, y);
    const { loading, results, randomNum, onClick, data, currentWeather, others } = useLoad(x, y);
    console.log(others);
    return (
        loading ? (
            <>
                <Helmet><title>Restaurant | Yeohang-ottae</title></Helmet>
                <Loader />
            </>
        ) : (
            <Container>
                <Helmet><title>Restaurant | Yeohang-ottae</title></Helmet>
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
                                <Divider>  ·  </Divider>
                                {/* <Link to={{
                                    pathname: '/Restaurant',
                                    state: { x: data.mapx, y: data.mapy }
                                }}
                                >
                                    <button>주변 음식점 추천</button>
                                </Link> */}
                                <Link to={{
                                    pathname: '/Accommodation',
                                    state: { x: x, y: y }
                                }} >
                                    <button>주변 숙박시설 추천</button>
                                </Link>

                                <SectionHr></SectionHr>
                                <Title>{data.title}</Title>

                                <ItemContainer>
                                    <Item>{data.type}</Item>
                                    <Divider>  ·  </Divider>
                                    <Item>{data.detail}</Item>
                                    <Divider>  ·  </Divider>
                                    <Item>{data.address}</Item>
                                    {data.tel && data.tel.length > 1 && (
                                        <>
                                            <Divider>  ·  </Divider>
                                            <Item>{data.tel}</Item>
                                        </>
                                    )}
                                </ItemContainer>
                                <ItemContainer>
                                    <SectionTitle>Map</SectionTitle>
                                    <SectionHr></SectionHr>
                                    <Content>
                                        <Map key={data.id} lat={data.mapy} lon={data.mapx} />
                                    </Content>
                                </ItemContainer>
                                {others && others.length > 0 && (
                                    <>
                                        <ItemContainer>
                                            <SectionTitle>다른 음식점 추천</SectionTitle>
                                            <SectionHr></SectionHr>
                                            <Others>
                                                {others.map((other) => (
                                                    <Poster
                                                        key={other.id}
                                                        image={other.image}
                                                        title={other.title}
                                                        detail={other.detail}
                                                        location={other.location}
                                                    />
                                                ))}
                                            </Others>
                                        </ItemContainer>
                                    </>
                                )}
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





export default Restaurant;