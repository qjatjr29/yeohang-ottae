var express = require('express');
var router = express.Router();
var urlencode = require('urlencode');
const bodyParser = require('body-parser');
var request = require('request');
const { Navigator } = require('node-navigator');
const navigator = new Navigator();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList?ServiceKey=';
const mykey = 'frbKaLu%2BIHFoUgvYbQvKiwbMlIRcNNg0H6iFBl8BHuNPe4FfR0eZM1PieorTXfyT5ymRidecqFlOByB1GGZMhQ%3D%3D';
// const mykey = 'KQCP2AAkffW6OZ%2BEXZm79qhVqu4JoKJkrWLM4TFzkBJ%2FSeF4H6nJ006O2euWmW%2BhPfckRRi613LBP%2By%2FRykQDg%3D%3D';
// const mykey = 'KQCP2AAkffW6OZ+EXZm79qhVqu4JoKJkrWLM4TFzkBJ/SeF4H6nJ006O2euWmW+hPfckRRi613LBP+y/RykQDg==';
// const realkey = urlencode.decode(mykey, "UTF-8");
// const realkey = decodeURI(mykey, "UTF-8");
// URLDecoder.decode(mykey, "UTF-8");

var latitude = 1;
var longitude = 1;


var sights = [];

// 내 현재 위치 주변 1000m 관광지
var apiUrl = url + mykey + '&mapX=126.981611&mapY=37.568477&radius=1000&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest&_type=json';
// var apiUrl = url + mykey + `&mapX=${latitude}&mapY=${longitude}&radius=1000&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest&_type=json`;

// navigator.geolocation.getCurrentPosition((success, error) => {
//     if (error) console.error(error);
//     else console.log(success);
// });

// var apiUrl = url;
// var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + mykey;
// queryParams += '&' + encodeURIComponent('mapX') + '=' + encodeURIComponent(126.981611);
// queryParams += '&' + encodeURIComponent('mapY') + '=' + encodeURIComponent(37.568477);
// queryParams += '&' + encodeURIComponent('radius') + '=' + encodeURIComponent(1000);
// queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y');
// queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('A');
// queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC');
// queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest');
// queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');

// request 라이브러리 통해 api 연결 하기 
// console.log(apiUrl);
// console.log(i);

// apiUrl = apiUrl + queryParams;

request(apiUrl, (err, res, body) => {
    if (err) {
        console.log(err);
    }
    // console.log(body);
    var obj = JSON.parse(body);
    // console.log(apiUrl);
    // console.log(obj.response.body.items.item);

    const items = obj.data;
})

router.get('/', (req, res) => {
    // console.log(Results.length);
    // var str= json.parse(realkey)
    res.json(apiUrl);
})
router.post('/', (req, res) => {
    console.log("ho");
    latitude = req.body.latitude;
    longitude = req.body.longitude;
    // apiUrl = url + mykey + `&mapX=${latitude}&mapY=${longitude}&radius=1000&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    res.redirect('/');
    console.log(req.body);
    // res.send(latitude);
})
module.exports = router;