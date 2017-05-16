var Client = require('node-rest-client').Client;

var client = new Client();

var args = {
	headers: { 'Content-Type': 'application/json'  }
};

var url = process.env.HEROKU_URL;

function doPatch() {
	client.patch(url + process.env.IP_SECRET, args, function(data, response){
		if (data !== true) {
			console.log('error response', response);
		}
		else {
			console.log('update sucessful');
		}
	});
}

function pingHeroku() {
	doPatch();
	
	setTimeout(function(){
		pingHeroku();
	}, 120000);
}



var ipUpdater = {
	start: function() {
		console.log('starting ipTracker');
		console.log('process.env.IP_SECRET', process.env.IP_SECRET);
		pingHeroku();
	},
};

module.exports = ipUpdater;