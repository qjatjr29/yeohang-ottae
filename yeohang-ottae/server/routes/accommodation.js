var express = require('express');
var router = express.Router();
var urlencode = require('urlencode');
const bodyParser = require('body-parser');
var request = require('request');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList?ServiceKey=';
const mykey = 'frbKaLu%2BIHFoUgvYbQvKiwbMlIRcNNg0H6iFBl8BHuNPe4FfR0eZM1PieorTXfyT5ymRidecqFlOByB1GGZMhQ%3D%3D';

var restaurants = [];

var mapX = 126.981611;
var mapY = 37.568477;

// 내 현재 위치 주변 1000m 관광지
var apiUrl = url + mykey + `&contentTypeId=32&mapX=${mapX}&mapY=${mapY}&radius=10000&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest&_type=json`;


request(apiUrl, (err, res, body) => {
    if (err) {
        console.log(err);
    }
    // console.log(body);
    var obj = JSON.parse(body);
    restaurants = [];
    // console.log(apiUrl);
    // console.log(obj.response.body.items.item);

    const items = obj.response.body.items.item;
    console.log("test", apiUrl);
    var id = 1;
    if (items) {
        var size = items.length;
        if (size > 1) {
            items.map((item) => {
                var detailNumber = item.cat3;
                var detail = "";
                if (detailNumber == "B02010100" || detailNumber == "B02010300" || detailNumber == "B02010700" || detailNumber == "B02011100") {
                    if (detailNumber == "B02010100") {
                        detail = "관광호텔";
                    } else if (detailNumber == "B02010300") {
                        detail = "전통호텔";
                    } else if (detailNumber == "B02010700") {
                        detail = "펜션";
                    } else if (detailNumber == "B02011100") {
                        detail = "게스트하우스";
                    }
                }
                var title = item.title;
                var tel = " ";
                var address = item.addr1;
                var image = " ";
                var mapx = item.mapx;
                var mapy = item.mapy;
                var type = "숙박시설";
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
                restaurants.push({
                    id: id,
                    title: title,
                    address: address,
                    tel: tel,
                    image: image,
                    type: type,
                    detail: detail,
                    mapx: mapx,
                    mapy: mapy
                });
                // console.log(item);
                // console.log(item.관광지명);
                id = id + 1;
            })

        } else {
            var detailNumber = item.cat3;
            var detail = "";
            if (detailNumber == "B02010100" || detailNumber == "B02010300" || detailNumber == "B02010700" || detailNumber == "B02011100") {
                if (detailNumber == "B02010100") {
                    detail = "관광호텔";
                } else if (detailNumber == "B02010300") {
                    detail = "전통호텔";
                } else if (detailNumber == "B02010700") {
                    detail = "펜션";
                } else if (detailNumber == "B02011100") {
                    detail = "게스트하우스";
                }
            }
            var type = "숙박시설";
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
            restaurants.push({
                id: id,
                title: title,
                address: address,
                tel: tel,
                image: image,
                type: type,
                detail: detail,
                mapx: mapx,
                mapy: mapy
            });

            id = id + 1;
        }
    }
    // const items = obj.data;
})

router.get('/', (req, res) => {
    res.json(restaurants);
})
router.post('/', (req, res) => {
    console.log("숙박시설");
    const lat = req.body.x;
    const lon = req.body.y;

    apiUrl = url + mykey + `&contentTypeId=32&mapX=${lat}&mapY=${lon}&radius=10000&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    // console.log(areaCode);
    console.log(apiUrl);
    request(apiUrl, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        // console.log(body);
        var obj = JSON.parse(body);
        console.log(obj);
        restaurants = [];
        // console.log(apiUrl);
        // console.log(obj.response.body.items.item);

        const items = obj.response.body.items.item;
        // console.log(items);
        var id = 1;
        if (items) {
            var size = items.length;
            if (size > 1) {
                items.map((item) => {
                    var detailNumber = item.cat3;
                    var detail = "";
                    if (detailNumber == "B02010100" || detailNumber == "B02010300" || detailNumber == "B02010700" || detailNumber == "B02011100") {
                        if (detailNumber == "B02010100") {
                            detail = "관광호텔";
                        } else if (detailNumber == "B02010300") {
                            detail = "전통호텔";
                        } else if (detailNumber == "B02010700") {
                            detail = "펜션";
                        } else if (detailNumber == "B02011100") {
                            detail = "게스트하우스";
                        }
                    }
                    var title = item.title;
                    var tel = " ";
                    var address = item.addr1;
                    var image = " ";
                    var mapx = item.mapx;
                    var mapy = item.mapy;
                    var type = "숙박시설";
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
                    restaurants.push({
                        id: id,
                        title: title,
                        address: address,
                        tel: tel,
                        image: image,
                        type: type,
                        detail: detail,
                        mapx: mapx,
                        mapy: mapy
                    });
                    // console.log(item);
                    // console.log(item.관광지명);
                    id = id + 1;
                })

            } else {
                var detailNumber = item.cat3;
                var detail = "";
                if (detailNumber == "B02010100" || detailNumber == "B02010300" || detailNumber == "B02010700" || detailNumber == "B02011100") {
                    if (detailNumber == "B02010100") {
                        detail = "관광호텔";
                    } else if (detailNumber == "B02010300") {
                        detail = "전통호텔";
                    } else if (detailNumber == "B02010700") {
                        detail = "펜션";
                    } else if (detailNumber == "B02011100") {
                        detail = "게스트하우스";
                    }
                }
                var type = "숙박시설";
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
                restaurants.push({
                    id: id,
                    title: title,
                    address: address,
                    tel: tel,
                    image: image,
                    type: type,
                    detail: detail,
                    mapx: mapx,
                    mapy: mapy
                });

                id = id + 1;
            }
        }
        // const items = obj.data;
    })
    res.redirect('/');
    // console.log(req.body);
    // res.send(latitude);
})
// router.put('/', (req, res) => {
//     // console.log(Results.length);
//     // var str= json.parse(realkey)
//     res.json(sights);
// })

module.exports = router;