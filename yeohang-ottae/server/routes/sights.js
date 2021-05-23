var express = require('express');
var router = express.Router();
var urlencode = require('urlencode');
const bodyParser = require('body-parser');
var request = require('request');
const { Navigator } = require('node-navigator');
const navigator = new Navigator();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=';
const mykey = 'frbKaLu%2BIHFoUgvYbQvKiwbMlIRcNNg0H6iFBl8BHuNPe4FfR0eZM1PieorTXfyT5ymRidecqFlOByB1GGZMhQ%3D%3D';

var sights = [];

var contentType = 12;
var cat1 = "A01";
var cat2 = "A0101";
var cat3 = "A01010400";
var areaCode = 1;

// 내 현재 위치 주변 1000m 관광지
var apiUrl = url + mykey + `&contentTypeId=${contentType}&cat1=${cat1}&cat2=${cat2}&cat3=${cat3}&areaCode=${areaCode}&MobileOS=ETC&MobileApp=AppTest&_type=json`;


request(apiUrl, (err, res, body) => {
    if (err) {
        console.log(err);
    }
    // console.log(body);
    var obj = JSON.parse(body);
    // console.log(apiUrl);
    // console.log(obj.response.body.items.item);

    const items = obj.response.body.items.item;
    items.map((item) => {
        var title = item.title;
        var tel = " ";
        var address = item.addr1;
        var image = " ";
        if (item.addr2) {
            address = address + item.addr2;
        }
        if (item.tel) {
            tel = item.tel;
        }
        if (item.firstimage) {
            image = item.firstimage;
        }
        // console.log(name, field, location);
        sights.push({ title: title, address: address, tel: tel, image: image });
        // console.log(item);
        // console.log(item.관광지명);
    })
    // const items = obj.data;
})

router.get('/', (req, res) => {
    // console.log(Results.length);
    // var str= json.parse(realkey)
    res.json(sights);
})
router.post('/', (req, res) => {
    console.log("!!");
    const location = req.body.firstCondition;
    const firstOption = req.body.secondCondition;
    const secondOption = req.body.thirdCondition;

    if (location == '서울') {
        areaCode = 1;
    }
    else if (location == '인천') {
        areaCode = 2;
    }
    else if (location == '대전') {
        areaCode = 3;
    }
    else if (location == '대구') {
        areaCode = 4;
    }
    else if (location == '광주') {
        areaCode = 5;
    }
    else if (location == '부산') {
        areaCode = 6;
    }
    else if (location == '울산') {
        areaCode = 7;
    }
    else if (location == '세종') {
        areaCode = 8;
    }
    else if (location == '경기도') {
        areaCode = 31;
    }
    else if (location == '강원도') {
        areaCode = 32;
    }
    else if (location == '충청북도') {
        areaCode = 33;
    }
    else if (location == '충청남도') {
        areaCode = 34;
    }
    else if (location == '경상북도') {
        areaCode = 35;
    }
    else if (location == '경상남도') {
        areaCode = 36;
    }
    else if (location == '전라북도') {
        areaCode = 37;
    }
    else if (location == '전라남도') {
        areaCode = 38;
    }
    else if (location == '제주도') {
        areaCode = 39;
    }

    if (firstOption == "관광지") {
        contentType = "12";
        if (secondOption == "산") {
            cat1 = "A01";
            cat2 = "A0101";
            cat3 = "A01010400";
        } else if (secondOption == "계곡") {
            cat1 = "A01";
            cat2 = "A0101";
            cat3 = "A01010900";
        } else if (secondOption == "해수욕장") {
            cat1 = "A01";
            cat2 = "A0101";
            cat3 = "A01011200";
        } else if (secondOption == "강") {
            cat1 = "A01";
            cat2 = "A0101";
            cat3 = "A01011800";
        } else if (secondOption == "국립공원") {
            cat1 = "A01";
            cat2 = "A0101";
            cat3 = "A01010100";
        } else if (secondOption == "유적지") {
            cat1 = "A02";
            cat2 = "A0201";
            cat3 = "A02010700";
        } else if (secondOption == "테마공원") {
            cat1 = "A02";
            cat2 = "A0202";
            cat3 = "A02020600";
        }

    }
    if (firstOption == "문화시설") {
        contentType = "14";
        if (secondOption == "박물관") {
            cat1 = "A02";
            cat2 = "A0206";
            cat3 = "A01010400";
        } else if (secondOption == "미술관") {
            cat1 = "A02";
            cat2 = "A0206";
            cat3 = "A02060500";
        } else if (secondOption == "공연장") {
            cat1 = "A02";
            cat2 = "A0206";
            cat3 = "A02060600";
        }
    }
    if (firstOption == "축제/공연/행사") {
        contentType = "15";
        if (secondOption == "일반축제") {
            cat1 = "A02";
            cat2 = "A0207";
            cat3 = "A02070200";
        } else if (secondOption == "연극") {
            cat1 = "A02";
            cat2 = "A0208";
            cat3 = "A02080200";
        } else if (secondOption == "뮤지컬") {
            cat1 = "A02";
            cat2 = "A0208";
            cat3 = "A02080300";
        } else if (secondOption == "오페라") {
            cat1 = "A02";
            cat2 = "A0208";
            cat3 = "A02080400";
        } else if (secondOption == "대중콘서트") {
            cat1 = "A02";
            cat2 = "A0208";
            cat3 = "A02081000";
        } else if (secondOption == "스포츠경기") {
            cat1 = "A02";
            cat2 = "A0208";
            cat3 = "A02081200";
        }
    }
    if (firstOption == "레포츠") {
        contentType = "28";
        if (secondOption == "육상레포츠") {
            cat1 = "A03";
            cat2 = "A0301";
            cat3 = "A03010100";
        } else if (secondOption == "수상레포츠") {
            cat1 = "A03";
            cat2 = "A0301";
            cat3 = "A03010200";
        } else if (secondOption == "항공레포츠") {
            cat1 = "A03";
            cat2 = "A0301";
            cat3 = "A03010300";
        }
    }


    apiUrl = url + mykey + `&contentTypeId=${contentType}&cat1=${cat1}&cat2=${cat2}&cat3=${cat3}&areaCode=${areaCode}&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    res.redirect('/');
    console.log(req.body);
    // res.send(latitude);
})
module.exports = router;