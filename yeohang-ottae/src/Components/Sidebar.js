import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom"
import styled from "styled-components";
import axios from "axios";

const Name = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width:500px;
    margin-bottom: 3px;
`;

const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState({});
    // const [currentTemp, setCurrentTemp] = useState(null);
    // const [currentFeel, setCurrentFeel] = useState(null);
    // const [currentHumidity, setCurrentHumidity] = useState(null);
    // const [currentState, setCurrentState,] = useState(null);
    const [loading, setLoading] = useState(true);

    const LoadWeather = async () => {
        // setLoading(false);
        // console.log("fd");
        try {
            console.log("weather");
            const currentWeather = await axios.get('/weather');
            console.log(currentWeather.data);
            const data = currentWeather.data;
            const currentData = {
                temp: data.temp,
                feels_like: data.feels_like,
                humidity: data.humidity,
                state: data.state
            }
            setCurrentWeather(currentData);
            console.log(currentData);
            // setCurrentWeather(data);
            // setCurrentTemp(data.temp);
            // setCurrentFeel(data.feels_like);
            // setCurrentHumidity(data.humidity);
            // setCurrentState(data.state);
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
    return { currentWeather };
}


const SideBar = () => {
    const { currentWeather } = useWeather();
    console.log(currentWeather);
    return <Name>{currentWeather.temp}</Name>
};

export default SideBar;