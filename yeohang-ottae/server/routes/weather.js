var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const url = 'http://api.openweathermap.org/data/2.5/'
const key = 'e29af268829ec74a36830507fbe43875'


var currentWeathers = null;
var FiveDaysWeather = [];

currentWeatherURL = url + 'weather?q=jeju&units=metric&appid=' + key;
fiveDayWeatherURL = url + 'forecast?q=jeju&units=metric&appid=' + key;
// request 라이브러리 통해 api 연결 하기 
// 현재 날씨 (제주도)
request(currentWeatherURL, (err, res, body) => {
    if (err) {
        console.log(err);
    }
    var obj = JSON.parse(body);
    // console.log(obj);
    const currentTemp = obj.main.temp;
    const feels_like = obj.main.feels_like;
    const humidity = obj.main.humidity;
    const state = obj.weather[0].main;
    currentWeathers = { temp: currentTemp, feels_like: feels_like, humidity: humidity, state: state };
})


request(fiveDayWeatherURL, (err, res, body) => {
    if (err) {
        console.log(err);
    }
    var obj = JSON.parse(body);
    for (let i = 9; i <= 13; i++) {
        if (i == 9 || i == 11 || i == 13) {
            // console.log(obj.list[0]);
        }
    }
    // console.log(obj.list);
    // currentWeathers = { temp: currentTemp, feels_like: feels_like, humidity: humidity, state: state };
})

router.get('/', (req, res) => {
    // console.log(Results.length);
    res.json(currentWeathers);
})

module.exports = router;