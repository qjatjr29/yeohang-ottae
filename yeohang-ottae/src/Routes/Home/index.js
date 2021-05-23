/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import KakaoMap from "../Home/kakaoMap"
const { kakao } = window;

const Container = styled.div`
    padding:20px;
    
`;
const MapContents = styled.div`
    width: 500px;
    height: 400px;
`;
const Content = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    position:relative;
    z-index:1;
    /* height:100%; */
`;
const Item = styled.div`
    margin-bottom:30px;
`;
const SectionTitle = styled.span`
    margin-top:20px;
    font-size:23px;
    font-weight:600;
`;

const useMyLocation = () => {
    const [coords, setCoords] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    // const [script, setScript] = useState(null);
    // const [map, setMap] = useState(null);
    // const [mapOption, setMapOption] = useState([]);

    const geolocationSucess = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(position.coords.latitude, position.coords.longitude);
        // return { "latitude": latitude, "longitude": longitude };
        setLatitude(latitude);
        setLongitude(longitude);
    }
    const geolocationFail = () => {
        console.log("fail");
    }

    const askForCoords = () => {
        if (navigator.geolocation) {
            // alert("사용가능");
            navigator.geolocation.getCurrentPosition(geolocationSucess, geolocationFail);
        }
        else {
            alert("불가능 ");
        }

    }
    const LoadMyCoords = async () => {
        const _coords = await axios.get('/test');
        // console.log(_coords);
        const data = _coords.data;
        setCoords(data);
    }
    const sendMyCoords = async () => {
        // console.log("hi");
        const coord = {
            latitude: latitude,
            longitude: longitude,
        };
        console.log(coord);
        axios.post('/data', coord)
            .then((res) => {
                console.log(res.data);
            }).then((err) => {
                console.log(err);
            }).then(() => {
                console.log(latitude, longitude);
                LoadMyCoords();
            })
    }
    useEffect(() => {
        askForCoords();
        sendMyCoords();

    }, [])
    // console.log(script);
    // console.log(latitude, longitude);
    return { coords, latitude, longitude };
}

const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState([]);
    const [currentTemp, setCurrentTemp] = useState(null);
    const [currentFeel, setCurrentFeel] = useState(null);
    const [currentHumidity, setCurrentHumidity] = useState(null);
    const [currentState, setCurrentState,] = useState(null);
    const [loading, setLoading] = useState(true);

    const LoadWeather = async () => {
        // setLoading(false);
        // console.log("fd");
        try {
            console.log("weather");
            const currentWeather = await axios.get('/weather');
            console.log(currentWeather.data);
            const data = currentWeather.data;
            setCurrentWeather(data);
            setCurrentTemp(data.temp);
            setCurrentFeel(data.feels_like);
            setCurrentHumidity(data.humidity);
            setCurrentState(data.state);
        } catch {
            console.log("err");
        } finally {
            setLoading(false);
            // console.log("1 ");
            // Classification();
        }
    }
    useEffect(() => {
        LoadWeather();
    }, []);
    return { currentWeather, currentTemp, currentFeel, currentHumidity, currentState };
}

const Home = () => {
    const { coords, latitude, longitude } = useMyLocation();
    const { currentWeather, currentTemp, currentFeel, currentHumidity, currentState } = useWeather();
    return (
        <Container>
            <Content>
                <MapContents id="map">
                    <div> {latitude}</div>
                    <span> and</span>
                    <div> {longitude}</div>
                    {/* {coords.map(coord => (
                    <>
                        <div> {coord.latitude}</div>
                        <span> and</span>
                        <div> {coord.longitude}</div>
                    </>
                ))} */}
                    {/* <div id="map"></div> */}
                </MapContents>
            </Content>
            <Content>
                <Item>
                    <SectionTitle>현재 날씨</SectionTitle>
                    <div>
                        <span>{currentTemp} ℃</span>
                        <br />
                        <span>{currentFeel}</span>
                        <br />
                        <span>{currentHumidity} %</span>
                        <br />
                        <span>{currentState}</span>
                    </div>
                </Item>
            </Content>

        </Container >
    );
}

export default Home;