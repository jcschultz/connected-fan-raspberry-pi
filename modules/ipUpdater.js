var Client = require('node-rest-client').Client;

var client = new Client();

var args = {
	data : { 'secret' : process.env.IP_SECRET },
	headers: { 'Content-Type': 'application/json' }
};

var url = process.env.HEROKU_IP_TRACKER_URL + '/' + process.env.MACHINE_NAME;

function doApiCall() {
	client.put(url, args, function(data, response){
		if (data !== true) {
			console.log('error response', response);
		}
		else {
			console.log('update sucessful');
		}
	});
}

function pingHeroku() {
	doApiCall();
	
	setTimeout(function(){
		pingHeroku();
	}, 300000); // 5 minutes
}



var ipUpdater = {
	start: function() {
		pingHeroku();
	},
};

module.exports = ipUpdater;