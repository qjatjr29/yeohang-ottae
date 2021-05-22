var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const url = 'https://api.odcloud.kr/api/3083562/v1/uddi:7efec86a-4e4b-4f92-9ee4-d3d624956d09'
const key = 'KQCP2AAkffW6OZ%2BEXZm79qhVqu4JoKJkrWLM4TFzkBJ%2FSeF4H6nJ006O2euWmW%2BhPfckRRi613LBP%2By%2FRykQDg%3D%3D'


var sights = [];
for (let i = 1; i <= 10; i++) {
    apiUrl = url + '?page=' + i + '&perPage=10&serviceKey=' + key;
    // request 라이브러리 통해 api 연결 하기 
    // console.log(apiUrl);
    console.log(i);
    request(apiUrl, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        var obj = JSON.parse(body);
        // console.log(obj.data);
        const items = obj.data;
        items.map((item) => {
            var name = item.관광지명;
            var field = item.분야;
            var location = " ";
            if (item.소재지) {
                location = item.소재지;
            }
            // console.log(name, field, location);
            sights.push({ name: name, field: field, location: location });
            // console.log(item);
            // console.log(item.관광지명);
        })
        // console.log(obj);
    })
}
router.get('/', (req, res) => {
    // console.log(Results.length);
    res.json(sights);
})

module.exports = router;