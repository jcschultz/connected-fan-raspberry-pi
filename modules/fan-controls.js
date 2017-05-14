const gpio = require('rpi-gpio');

const buttons = {
	light: {
		color: 'blue',
		pin: 37
	},
	low: {
		color: 'red',
		pin: 15
	},
	medium: {
		color: 'grey',
		pin: 22
	},
	high: {
		color: 'yellow',
		pin: 31
	},
	off: {
		color: 'orange',
		pin: 36
	}
};

function Result() {
	return {
		success: null,
		error: null
	}
}


let pressButton = function(name) {
	return new Promise((resolve, reject) => {
		
		gpio.write(buttons[name].pin, true, (err) => {
			if (err) {
				console.error('error turning on pin: ' + buttons[name].pin);
				console.error(err);
				reject(err);
			}
			console.log('turned pin ' + buttons[name].pin + ' on');
			
			setTimeout(function () {
				gpio.write(buttons[name].pin, false, (err) => {
					if (err) {
						console.error('error turning off pin: ' + buttons[name].pin);
						console.error(err);
						reject(err);
					}
					console.log('turned ' + buttons[name].pin + ' off');
					
					resolve(true);
				});
			}, 250);
		});
	});
};

module.exports = {
	
	initPins : function() {
		for (let prop in buttons) {
			if (buttons.hasOwnProperty(prop)) {
				let pinNumber = buttons[prop].pin;
				
				console.log('Attempting to set up pin: ', pinNumber);
				gpio.setup(pinNumber, gpio.DIR_OUT, (err) => {
					if (err) {
						console.error('Failed to set up pin: ', pinNumber);
						console.error(err);
					}
					else {
						console.log('Successfully set up pin: ', pinNumber);
					}
				});
			}
		}
	},
	
	setFanSpeed : function(speed) {
		return new Promise((resolve, reject) => {
			let result = new Result();
			
			pressButton(speed.toLowerCase())
				.then(() => {
					result.success = true;
					resolve(result);
				})
				.catch((err) => {
					result.success = false;
					result.error = err;
					reject(result);
				});
		});
	},
	
	toggleLight : function() {
		return this.setFanSpeed('light');
	}
};