var express = require('express');
var router = express.Router();
var controls = require('./../modules/fan-controls');

// fan controls
router.get('/fan/:action', function (req, res, next) {
	res.json( controls.setFanSpeed(req.params.action) );
});

// light toggle
router.get('/light', function (req, res, next) {
	res.json( controls.toggleLight() );
});

module.exports = router;
