var Express = require('express');
const router = Express.Router();

const filecache = require('../../../cache/fscache');

router.get('/', function (req, res, next) {   

    res.json(filecache.getFiles())
    
});


module.exports = router;