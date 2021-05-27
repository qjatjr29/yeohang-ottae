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
var apiUrl = url + mykey + `&contentTypeId=39&mapX=${mapX}&mapY=${mapY}&radius=10000&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest&_type=json`;


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
                if (
                    detailNumber == "A05020100" ||
                    detailNumber == "A05020200" ||
                    detailNumber == "A05020300" ||
                    detailNumber == "A05020400" ||
                    detailNumber == "A05020500" ||
                    detailNumber == "A05020600" ||
                    detailNumber == "A05020700" ||
                    detailNumber == "A05020900"
                ) {
                    if (detailNumber == "A05020100") {
                        detail = "한식";
                    } else if (detailNumber == "A05020200") {
                        detail = "서양식";
                    } else if (detailNumber == "A05020300") {
                        detail = "일식";
                    } else if (detailNumber == "A05020400") {
                        detail = "중식";
                    } else if (detailNumber == "A05020500") {
                        detail = "아시아식";
                    } else if (detailNumber == "A05020600") {
                        detail = "패밀리레스토랑";
                    } else if (detailNumber == "A05020700") {
                        detail = "이색음식점";
                    } else if (detailNumber == "A050A0502090020400") {
                        detail = "바 / 카페";
                    }
                }
                var title = item.title;
                var tel = " ";
                var address = item.addr1;
                var image = " ";
                var mapx = item.mapx;
                var mapy = item.mapy;
                var type = "음식점";
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
            if (
                detailNumber == "A05020100" ||
                detailNumber == "A05020200" ||
                detailNumber == "A05020300" ||
                detailNumber == "A05020400" ||
                detailNumber == "A05020500" ||
                detailNumber == "A05020600" ||
                detailNumber == "A05020700" ||
                detailNumber == "A05020900"
            ) {
                if (detailNumber == "A05020100") {
                    detail = "한식";
                } else if (detailNumber == "A05020200") {
                    detail = "서양식";
                } else if (detailNumber == "A05020300") {
                    detail = "일식";
                } else if (detailNumber == "A05020400") {
                    detail = "중식";
                } else if (detailNumber == "A05020500") {
                    detail = "아시아식";
                } else if (detailNumber == "A05020600") {
                    detail = "패밀리레스토랑";
                } else if (detailNumber == "A05020700") {
                    detail = "이색음식점";
                } else if (detailNumber == "A050A0502090020400") {
                    detail = "바 / 카페";
                }
            }
            var type = "음식점";
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
    console.log("음식점");
    const lat = req.body.x;
    const lon = req.body.y;

    apiUrl = url + mykey + `&contentTypeId=39&mapX=${lat}&mapY=${lon}&radius=10000&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest&_type=json`;
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
                    if (
                        detailNumber == "A05020100" ||
                        detailNumber == "A05020200" ||
                        detailNumber == "A05020300" ||
                        detailNumber == "A05020400" ||
                        detailNumber == "A05020500" ||
                        detailNumber == "A05020600" ||
                        detailNumber == "A05020700" ||
                        detailNumber == "A05020900"
                    ) {
                        if (detailNumber == "A05020100") {
                            detail = "한식";
                        } else if (detailNumber == "A05020200") {
                            detail = "서양식";
                        } else if (detailNumber == "A05020300") {
                            detail = "일식";
                        } else if (detailNumber == "A05020400") {
                            detail = "중식";
                        } else if (detailNumber == "A05020500") {
                            detail = "아시아식";
                        } else if (detailNumber == "A05020600") {
                            detail = "패밀리레스토랑";
                        } else if (detailNumber == "A05020700") {
                            detail = "이색음식점";
                        } else if (detailNumber == "A050A0502090020400") {
                            detail = "바 / 카페";
                        }
                    }
                    var title = item.title;
                    var tel = " ";
                    var address = item.addr1;
                    var image = " ";
                    var mapx = item.mapx;
                    var mapy = item.mapy;
                    var type = "음식점";
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
                if (
                    detailNumber == "A05020100" ||
                    detailNumber == "A05020200" ||
                    detailNumber == "A05020300" ||
                    detailNumber == "A05020400" ||
                    detailNumber == "A05020500" ||
                    detailNumber == "A05020600" ||
                    detailNumber == "A05020700" ||
                    detailNumber == "A05020900"
                ) {
                    if (detailNumber == "A05020100") {
                        detail = "한식";
                    } else if (detailNumber == "A05020200") {
                        detail = "서양식";
                    } else if (detailNumber == "A05020300") {
                        detail = "일식";
                    } else if (detailNumber == "A05020400") {
                        detail = "중식";
                    } else if (detailNumber == "A05020500") {
                        detail = "아시아식";
                    } else if (detailNumber == "A05020600") {
                        detail = "패밀리레스토랑";
                    } else if (detailNumber == "A05020700") {
                        detail = "이색음식점";
                    } else if (detailNumber == "A050A0502090020400") {
                        detail = "바 / 카페";
                    }
                }
                var type = "음식점";
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