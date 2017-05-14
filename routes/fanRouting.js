let express = require('express');
let router = express.Router();
let controls = require('./../modules/fan-controls');

// fan controls
router.get('/fan/:action', function (req, res, next) {
	controls.setFanSpeed(req.params.action)
		.then((result) => {
			console.log('Result of fan action: ', result);
			res.json(result);
		})
		.catch((err) => {
			console.error('Error in fan action: ', err);
			res.json(err);
		});
	
});

// light toggle
router.get('/light', function (req, res, next) {
	controls.toggleLight()
		.then((result) => {
			console.log('Result of light toggle: ', result);
			res.json(result);
		})
		.catch((err) => {
			console.error('Error in light toggle: ', err);
			res.json(err);
		});
});

module.exports = router;
