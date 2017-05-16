var Client = require('node-rest-client').Client;

var client = new Client();

var args = {
	headers: { 'Content-Type': 'application/json'  }
};

var url = process.env.HEROKU_URL + process.env.HEROKU_ADDRESS_PATH + '/' + process.env.IP_SECRET;

function doPatch() {
	client.patch(url, args, function(data, response){
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
		pingHeroku();
	},
};

module.exports = ipUpdater;