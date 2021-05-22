var express = require('express');
var router = express.Router();

let latitude = "";
let longitude = "";
const geolocationSucess = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(position.coords.latitude, position.coords.longitude);
    return { "latitude": latitude, "longitude": longitude };
}
const geolocationFail = () => {
    console.log("fail");
}

const askForCoords = () => {
    if (navigator.geolocation) {
        alert("사용가능");
    }
    else {
        alert("불가능 ");
    }
    // navigator.geolocation.getCurrentPosition(geolocationSucess, geolocationFail);
}

router.get('/', (req, res) => {
    // res.json([
    //     {

    //     }
    // ])
    askForCoords();
    res.send(latitude);
})

module.exports = router;