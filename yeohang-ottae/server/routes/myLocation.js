var express = require('express');
var router = express.Router();
var urlencode = require('urlencode');
const bodyParser = require('body-parser');
var request = require('request');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList?ServiceKey=';
const mykey = 'frbKaLu%2BIHFoUgvYbQvKiwbMlIRcNNg0H6iFBl8BHuNPe4FfR0eZM1PieorTXfyT5ymRidecqFlOByB1GGZMhQ%3D%3D';

var myLocationSights = [];

var mapX = 126.9977;
var mapY = 37.5682;
var radius = 1000;


// 내 현재 위치 주변 1000m 관광지
var myLocationAPI = url + mykey + `&mapX=${mapX}&mapY=${mapY}&radius=${1000}&numOfRows=100&pageNo=1&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest&_type=json`;

request(myLocationAPI, (err, res, body) => {
    if (err) {
        console.log(err);
    }
    // console.log(body);
    var obj = JSON.parse(body);
    myLocationSights = [];
    const items = obj.response.body.items.item;
    items.map((item) => {
        var type_number = item.contenttypeid;
        var type = " ";
        if (type_number == 12 || type_number == 14 || type_number == 15 || type_number == 28) {
            if (type_number == 12) {
                type = "관광지";
            }
            else if (type_number == 14) {
                type = "문화시설";
            }
            else if (type_number == 15) {
                type = "축제/공연/행사";
            }
            else if (type_number == 28) {
                type = "레포츠";
            }
            var title = item.title;
            var tel = " ";
            var address = item.addr1;
            var image = " ";
            var mapx = item.mapx;
            var mapy = item.mapy;
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
            myLocationSights.push({
                title: title,
                address: address,
                tel: tel,
                image: image,
                mapx: mapx,
                mapy: mapy,
                type: type,
            });
        }
    })
})

router.get('/', (req, res) => {
    res.json(myLocationSights);
})

router.post('/', (req, res) => {
    console.log("!!");
    const lat = req.body.y;
    const lon = req.body.x;


    myLocationAPI = url + mykey + `&mapX=${lat}&mapY=${lon}&radius=${1000}&numOfRows=100&pageNo=1&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    // console.log(areaCode);
    console.log("post", myLocationAPI);
    request(myLocationAPI, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        // console.log(body);
        var obj = JSON.parse(body);
        console.log(obj);
        myLocationSights = [];
        // console.log(apiUrl);
        // console.log(obj.response.body.items.item);

        const items = obj.response.body.items.item;
        // console.log(items);
        var id = 1;
        if (items) {
            var size = items.length;
            if (size > 1) {
                items.map((item) => {
                    var type_number = item.contenttypeid;
                    var type = " ";
                    if (type_number == 12 || type_number == 14 || type_number == 15 || type_number == 28) {
                        if (type_number == 12) {
                            type = "관광지";
                        }
                        else if (type_number == 14) {
                            type = "문화시설";
                        }
                        else if (type_number == 15) {
                            type = "축제/공연/행사";
                        }
                        else if (type_number == 28) {
                            type = "레포츠";
                        }
                        var title = item.title;
                        var tel = " ";
                        var address = item.addr1;
                        var image = " ";
                        var mapx = item.mapx;
                        var mapy = item.mapy;
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
                        myLocationSights.push({
                            id: id,
                            title: title,
                            address: address,
                            tel: tel,
                            image: image,
                            mapx: mapx,
                            mapy: mapy,
                            type: type,
                        });
                    }
                    // console.log(item);
                    // console.log(item.관광지명);
                    id = id + 1;
                })

            } else {
                var title = items.title;
                var tel = " ";
                var address = items.addr1;
                var image = " ";
                var mapx = items.mapx;
                var mapy = items.mapy;
                if (items.addr2) {
                    address = address + items.addr2;
                }
                if (items.tel) {
                    tel = items.tel;
                }
                if (items.firstimage) {
                    image = items.firstimage;
                }
                // console.log(name, field, location);
                sights.push({
                    id: id,
                    title: title,
                    address: address,
                    tel: tel,
                    image: image,
                    location: location,
                    type: firstOption,
                    detail: secondOption,
                    mapx: mapx,
                    mapy: mapy
                });
                // console.log(item);
                // console.log(item.관광지명);
                id = id + 1;
            }
        }
        // const items = obj.data;
    })
    res.redirect('/');
    // console.log(req.body);
    // res.send(latitude);
})


module.exports = router;