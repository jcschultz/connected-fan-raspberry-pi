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
			console.log('turned pin ' + pin + ' on');
			
			setTimeout(function () {
				gpio.write(pin, false, (err) => {
					if (err) {
						console.error('error turning off pin: ' + buttons[name].pin);
						console.error(err);
						reject(err);
					}
					console.log('turned ' + pin + ' off');
					
					resolve(true);
				});
			}, 250);
		});
	});
}

module.exports = {
	
	initPins : function() {
		for (var prop in buttons) {
			if (buttons.hasOwnProperty(prop)) {
				gpio.setup(prop.pin, gpio.DIR_OUT, function(){
					console.log('Successfully set up pin: ', prop.pin);
				});
			}
		}
	},
	
	setFanSpeed : function(speed) {
		var result = new Result();
		
		pressButton(speed.toLowerCase())
			.then(() => {
				result.success = true;
			})
			.catch((err) => {
				result.success = false;
				result.error = err;
			})
			.then(() => {
				return result;
			});
		
	},
	
	toggleLight : function() {
		return this.setFanSpeed('light');
	}
};