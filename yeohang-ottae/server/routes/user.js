var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

let latitude = 1;
let longitude = 1;

router.get('/', (req, res) => {
    res.json([
        { id: 1, latitude: latitude, longitude: longitude }
    ])
})
router.post('/', (req, res) => {
    // console.log("ho");
    latitude = req.body.latitude;
    longitude = req.body.longitude;
    // console.log(req.body);
    // res.send(latitude);
})
module.exports = router;