var Express = require('express');
const router = Express.Router();

const data = require('./data');
router.use('/data', data);

const files = require('./files');
router.use('/files', files);

module.exports = router;