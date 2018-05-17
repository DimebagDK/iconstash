var Express = require('express');
const router = Express.Router();

var config = require('../../../config/config'); 

router.get('/*', function (req, res, next) {   

    var fn = req.url; //decodeURIComponent(req.query.fn);

    if (fn && fn.length > 0 && fn.charAt(0) === '/') {
        fn = fn.substr(1);
    }

    if (fn && fn.length > 0 && fn.charAt(0) === '.') {
        res.status(500).send('FUCK OFF');
    }

    //console.log('req.url : ', req.url); 

    var _abs = config.iconfolder + fn;

    res.set('Content-Type', 'image/png');
    res.sendFile(_abs)
    
});


module.exports = router;