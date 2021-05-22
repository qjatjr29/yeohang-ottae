const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');
const myLocation = require('./routes/myLocation');
const test = require('./routes/user');
const sights = require('./routes/sights');
const weather = require('./routes/weather');



app.use(cors());
app.use(api);
app.use('/myLocation', myLocation);
app.use('/test', test);
app.use('/sights', sights);
app.use('/weather', weather);

const port = 3002;
app.listen(port, () => console.log(`Listening on port ${port}`));