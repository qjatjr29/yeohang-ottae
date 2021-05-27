import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Select from "react-select";
import SightTable from "../../Components/sightsTable";
import { Link } from "react-router-dom";

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
const SelectTitle = styled.span`
    /* margin :30px 0px; */
    font-size:23px;
    font-weight:600;
    color:white;
`;
const Table = styled.table`
    width:100%;
    border-spacing:30px;
    border-collapse: separate;
`;
const SelectDiv = styled.div`
    margin: 30px;
    height: 170px;
    color:black;
`;
const SelectBtn = styled.div`
    margin-left: 30px;
    margin-bottom:20px;;
`;
const SelectHr = styled.hr`
    margin-top:15px;
`;



const useSights = () => {
    const [sights, setSights] = useState([]);
    const [firstCondition, setFirstCondition] = useState(null);
    const [secondCondition, setSecondCondition] = useState(null);
    const [thirdCondition, setThirdCondition] = useState(null);
    const [click, setClick] = useState(false);
    // const [firstCheck, setFirstCheck] = useState(true);
    // const [secondCheck, setSecondCheck] = useState(true);
    // const [thirdCheck, setThirdCheck] = useState(true);
    // const [fourthCheck, setFourthCheck] = useState(true);
    const [loading, setLoading] = useState(true);
    const firstOption = useMemo(() => [
        { value: "전체", label: "전체", type: "first" },
        { value: "서울", label: "서울", type: "first" },
        { value: "인천", label: "인천", type: "first" },
        { value: "대전", label: "대전", type: "first" },
        { value: "대구", label: "대구", type: "first" },
        { value: "광주", label: "광주", type: "first" },
        { value: "부산", label: "부산", type: "first" },
        { value: "경기도", label: "경기도", type: "first" },
        { value: "강원도", label: "강원도", type: "first" },
        { value: "충청북도", label: "충청북도", type: "first" },
        { value: "충청남도", label: "충청남도", type: "first" },
        { value: "경상북도", label: "경상북도", type: "first" },
        { value: "경상남도", label: "경상남도", type: "first" },
        { value: "전라북도", label: "전라북도", type: "first" },
        { value: "전라남도", label: "전라남도", type: "first" },
        { value: "제주도", label: "제주도", type: "first" },
    ])
    const secondOption = useMemo(() => [
        { value: "관광지", label: "관광지", type: "second" },
        { value: "문화시설", label: "문화시설", type: "second" },
        { value: "축제/공연/행사", label: "축제/공연/행사", type: "second" },
        { value: "레포츠", label: "레포츠", type: "second" },
    ])

    var thirdOption = [];

    if (secondCondition == "관광지") {
        thirdOption = [
            { value: "산", label: "산", type: "third" },
            { value: "계곡", label: "계곡", type: "third" },
            { value: "해수욕장", label: "해수욕장", type: "third" },
            { value: "강", label: "강", type: "third" },
            { value: "유적지", label: "유적지", type: "third" },
            { value: "테마공원", label: "테마공원", type: "third" },
        ]
    }
    else if (secondCondition == "문화시설") {
        thirdOption = [
            { value: "박물관", label: "박물관", type: "third" },
            { value: "미술관", label: "미술관", type: "third" },
            { value: "공연장", label: "공연장", type: "third" },
        ]
    }
    else if (secondCondition == "축제/공연/행사") {
        thirdOption = [
            { value: "일반축제", label: "일반축제", type: "third" },
            { value: "연극", label: "연극", type: "third" },
            { value: "뮤지컬", label: "뮤지컬", type: "third" },
            { value: "오페라", label: "오페라", type: "third" },
            { value: "대중콘서트", label: "대중콘서트", type: "third" },
            { value: "스포츠경기", label: "스포츠경기", type: "third" },
        ]
    }
    else if (secondCondition == "레포츠") {
        thirdOption = [
            { value: "육상레포츠", label: "육상레포츠", type: "third" },
            { value: "수상레포츠", label: "수상레포츠", type: "third" },
            { value: "항공레포츠", label: "항공레포츠", type: "third" },
        ]
    }



    // const [firstOption,setFirstOption]=useState([]);
    // const [secondOption,setSecondOption]=useState([]);
    // const [thirdOption,setThirdOption]=useState([]);
    // const [fourthOption,setFourthOption]=useState([]);
    const handleSubmit = (event) => {
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
    const handleChange = (event) => {
        console.log(event);
        // const { target: { type } } = event;
        const type = event.type;
        const Condition = event.value;
        if (type == "first") {
            setFirstCondition(Condition);
            // console.log(firstChange);
        }
        else if (type == "second") {
            setSecondCondition(Condition);
            // console.log(firstChange);
        }
        else if (type == "third") {
            setThirdCondition(Condition);
            // console.log(firstChange);
        }
    }

    // server api에서 정보 받아오기
    // localhost:3002/sights 에서 정보 받아옴, 정보 보내기.
    const LoadData = async () => {
        try {
            const sights = await axios.get('/sights');
            console.log(sights.data);
            // const data = _coords.data;
            setSights(sights.data);
        } catch {
            console.log("err");
        } finally {
            setLoading(false);
            // console.log("1 ");
        }
    }
    const sendData = async () => {
        const info = {
            firstCondition,
            secondCondition,
            thirdCondition,
        };
        console.log(info);
        await axios.post('/sights', info)
            .then((res) => {
                console.log(res.data);
            }).then((err) => {
                console.log(err);
            }).then(() => {
                console.log(firstCondition, secondCondition, thirdCondition);
                // LoadMyCoords();
            })
    }
    useEffect(() => {
        // LoadData();
        // console.log(firstCondition);
        // console.log(secondCondition);
        // console.log(thirdCondition);
        sendData();
        LoadData();
    }, [click]);
    return { loading, sights, firstOption, secondOption, thirdOption, handleChange, handleSubmit };
}



const Sights = () => {
    const { loading, sights, firstOption, secondOption, thirdOption, handleChange, handleSubmit } = useSights();

    return (
        <Container>
            <Helmet><title>Questions | Yeohang-ottae</title></Helmet>
            <div>
                <SelectDiv>
                    <SelectTitle>Select Location</SelectTitle>
                    <SelectHr></SelectHr>
                    <Select options={firstOption} onChange={handleChange} />
                </SelectDiv>
                <SelectDiv>
                    <SelectTitle>Select type</SelectTitle>
                    <SelectHr></SelectHr>
                    <Select options={secondOption} onChange={handleChange} />
                </SelectDiv>
                <SelectDiv>
                    <SelectTitle>Select detail</SelectTitle>
                    <SelectHr></SelectHr>
                    <Select options={thirdOption} onChange={handleChange} />
                </SelectDiv>
                {/* <Link to="/Results">
                    <button onClick={handleSubmit}>선택</button>
                </Link> */}
                <SelectBtn>
                    <button onClick={handleSubmit}>선택</button>
                </SelectBtn>
                <SelectBtn>
                    <Link to="Results">
                        <div>검색 결과로 이동</div>
                    </Link>
                </SelectBtn>

            </div>

        </Container>

    );
}

export default Sights;