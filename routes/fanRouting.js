let express = require('express');
let router = express.Router();
let controls = require('./../modules/fan-controls');

// fan controls
router.get('/fan/:action', function (req, res, next) {
	let result = controls.setFanSpeed(req.params.action);
	console.log('result', result);
	res.json( result );
});

// light toggle
router.get('/light', function (req, res, next) {
	let result = controls.toggleLight();
	console.log('result', result);
	res.json( result );
});

module.exports = router;
