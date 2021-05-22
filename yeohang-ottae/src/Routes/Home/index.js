/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import KakaoMap from "../Home/kakaoMap"
const { kakao } = window;

const Container = styled.div`
    padding:20px;
    
`;
const MapContents = styled.div`
    width: 500px;
    height: 400px;
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
        axios.post('/test', coord)
            .then((res) => {
                console.log(res.data);
            }).then((err) => {
                console.log(err);
            }).then(() => {
                console.log(latitude, longitude);
                LoadMyCoords();
            })

        // axios({
        //     method: 'post',
        //     url: '/test',
        //     data: {
        //         latitude: latitude,
        //         longitude: longitude,
        //     }
        // });
    }
    useEffect(() => {
        askForCoords();
        sendMyCoords();

        // const script = document.createElement("script");
        // script.async = true;
        // script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=64fe979e65321e35d92f72dbadf4ef36"
        // document.head.appendChild(script);
        // script.onload = () => {
        //     kakao.maps.load(() => {
        //         let container = document.getElementById('kakaoMap');
        //         let options = {
        //             center: new kakao.maps.LatLng(latitude, longitude),
        //             level: 3
        //         };
        //         const map = new window.kakao.maps.Map(container, options);
        //         setMap(map);
        //     })
        // }
        // return () => {
        //     setLatitude(null);
        //     setLongitude(null);
        //     setCoords([]);
        // }
    }, [])
    // console.log(script);
    // console.log(latitude, longitude);
    return { coords, latitude, longitude };
}



const Home = () => {
    const { coords, latitude, longitude } = useMyLocation();
    // useEffect(() => {
    //     console.log(latitude);
    //     const script = document.createElement("script");
    //     script.async = true;
    //     script.autoload = false;
    //     script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=64fe979e65321e35d92f72dbadf4ef36"
    //     document.head.appendChild(script);
    //     // <script type="text/javascript">


    //     // </script>
    //     script.onload = () => {
    //         kakao.maps.load(() => {
    //             var container = document.getElementById("map");
    //             var options = {
    //                 center: new kakao.maps.LatLng(latitude, longitude),
    //                 level: 3
    //             };
    //             var map = new kakao.maps.Map(container, options);
    //             // setMap(map);
    //         });
    //     };
    //     // var container = document.getElementById('map');
    //     // var options = {
    //     //     center: new kakao.maps.LatLng(latitude, longitude),
    //     //     level: 3
    //     // };
    //     // var map = new kakao.maps.Map(container, options);
    // }, [])

    return (
        <Container>
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
        </Container >
    );
}

export default Home;