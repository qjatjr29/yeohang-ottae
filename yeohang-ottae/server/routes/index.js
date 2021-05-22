const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ greeting: 'Hello React X Node.js' });
});
router.get('/myPosition', (req, res) => {

})




module.exports = router;