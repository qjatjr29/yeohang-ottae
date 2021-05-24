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
const InfoContainer = styled.div`
    width:370px;
    display:grid;
    position:fixed;
    grid-template-columns: repeat(4, 1fr);
    top:700px;
    left:40px;
    justify-content:space-between;
    align-items: center;
    background-color:rgba(255,255,255,0.7);
    padding:10px;
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

const useLoad = () => {
    const [results, setResults] = useState([]);
    const [randomNum, setRandomNum] = useState(null);

    const [loading, setLoading] = useState(true);

    const LoadData = async () => {
        try {
            const results = await axios.get('/sights');
            console.log(results.data);
            // const data = _coords.data;
            setResults(results.data);

        } catch {
            console.log("err");
        } finally {
            setLoading(false);
            const size = results.length;
            const randomNum = Math.floor(Math.random() * size) + 1;
            setRandomNum(randomNum);
            console.log(size);
            console.log(randomNum);
            // console.log("1 ");
        }
    }

    useEffect(() => {
        LoadData();
    }, []);
    return { loading, results, randomNum };
}


const Results = () => {
    const { loading, results, randomNum } = useLoad();
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
                    {results.map((result, i) =>
                        i !== randomNum ? null :
                            <>
                                <Cover bgImage={results[i].image} />
                                <InfoContainer>
                                    <InfoTitle>{results[i].title}</InfoTitle>
                                </InfoContainer>
                                <Data>
                                    <Title>{results[i].title}</Title>
                                    <ItemContainer>
                                        <Item>{results[i].type}</Item>
                                        <Divider>  ·  </Divider>
                                        <Item>{results[i].detail}</Item>
                                        <Divider>  ·  </Divider>
                                        <Item>{results[i].location}</Item>
                                        <Divider>  ·  </Divider>
                                        <Item>{results[i].address}</Item>
                                        {results[i].tel && results[i].tel.length > 1 && (
                                            <>
                                                <Divider>  ·  </Divider>
                                                <Item>{results[i].tel}</Item>
                                            </>
                                        )}
                                    </ItemContainer>
                                </Data>
                                <SectionTitle>{results[i].type}</SectionTitle>
                            </>
                    )}

                </Content>


            </Container>
        ));
}


export default Results;