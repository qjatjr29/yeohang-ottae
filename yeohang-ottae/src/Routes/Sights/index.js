import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import SightTable from "../../Components/sightsTable";
// import SightsApi from "../../Api/api"


const Container = styled.div`
    padding:20px;
    
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
const Table = styled.table`
    width:100%;
    border-spacing:30px;
    border-collapse: separate;
`;


const useSights = () => {
    const [sights, setSights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [foods, setFoods] = useState([]);
    const [tours, setTours] = useState([]);
    const [traffics, setTraffics] = useState([]);
    const [lodges, setLodges] = useState([]);
    // console.log("use");
    // console.log(foods);
    // 음식, 숙박, 교통, 관광지 로 분류.
    const Classification = () => {
        // console.log(sights);
        const foods = [];
        const tours = [];
        const traffics = [];
        const lodges = [];

        for (let i = 0; i < sights.length; i++) {
            if (sights[i].field === "음식") {
                foods.push(sights[i]);
            } else if (sights[i].field === "숙박") {
                lodges.push(sights[i]);
            } else if (sights[i].field === "교통") {
                traffics.push(sights[i]);
            } else if (sights[i].field === "관광지") {
                tours.push(sights[i]);
            }
        }
        setFoods(foods);
        setTours(tours);
        setTraffics(traffics);
        setLodges(lodges);
    }

    // server api에서 정보 받아오기
    // localhost:3002/sights 에서 정보 받아옴
    const LoadData = async () => {
        // setLoading(false);
        // console.log("fd");
        try {
            const sights = await axios.get('/sights');
            console.log(sights.data);
            // const data = _coords.data;
            setSights(sights.data);
        } catch {
            console.log("err");
        } finally {
            setLoading(false);
            console.log("1 ");
            Classification();
        }
    }
    useEffect(() => {
        LoadData();
    }, []);
    return { loading, sights, foods, tours, traffics, lodges };
}



const Sights = () => {
    const { loading, sights, foods, tours, traffics, lodges } = useSights();

    return (
        loading ? (
            <Loader>
                <Helmet><title>Jeju | Sights</title></Helmet>
            </Loader>
        ) : (
            <Container>
                <Helmet><title>Jeju | Sights</title></Helmet>
                <Content>
                    {tours && tours.length > 0 && (
                        <Item>
                            <SectionTitle>관광지</SectionTitle>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>이름</td>
                                        <td>위치</td>
                                    </tr>
                                    {tours.map(tour => (
                                        <SightTable
                                            name={tour.name}
                                            location={tour.location}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </Item>
                    )}
                    {foods && foods.length > 0 && (
                        <Item>
                            <SectionTitle>음식</SectionTitle>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>이름</td>
                                        <td>위치</td>
                                    </tr>
                                    {foods.map(food => (
                                        <SightTable
                                            name={food.name}
                                            location={food.location}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </Item>
                    )}

                    {lodges && lodges.length > 0 && (
                        <Item>
                            <SectionTitle>숙박</SectionTitle>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>이름</td>
                                        <td>위치</td>
                                    </tr>
                                    {lodges.map(lodge => (
                                        <SightTable
                                            name={lodge.name}
                                            location={lodge.location}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </Item>
                    )}
                    {traffics && traffics.length > 0 && (
                        <Item>
                            <SectionTitle>교통</SectionTitle>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>이름</td>
                                        <td>위치</td>
                                    </tr>
                                    {traffics.map(traffic => (
                                        <SightTable
                                            name={traffic.name}
                                            location={traffic.location}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </Item>
                    )}

                </Content>
            </Container>
        )

    );
}

export default Sights;