const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');

const myLocation = require('./routes/myLocation');
const test = require('./routes/user');
const test_sights = require('./routes/test_sights');
const weather = require('./routes/weather');


const surrounding = require('./routes/surrounding');
const sights = require('./routes/sights');
const restaurant = require('./routes/restaurant');
const accommodation = require('./routes/accommodation');

app.use(cors());
app.use(api);

app.use('/sights', sights);
app.use('/weather', weather);
app.use('/myLocation', myLocation);
app.use('/restaurant', restaurant);
app.use('/accommodation', accommodation);

app.use('/surrounding', surrounding);
app.use('/test', test);
app.use('/test_sights', test_sights);


const port = 3002;
app.listen(port, () => console.log(`Listening on port ${port}`));