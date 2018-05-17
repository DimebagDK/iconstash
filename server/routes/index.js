var Express = require('express');
const router = Express.Router();

var route_api = require('./api');

router.use('/api', route_api);

module.exports = router;
