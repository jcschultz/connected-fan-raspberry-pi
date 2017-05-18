var Client = require('node-rest-client').Client;

var client = new Client();

var args = {
	data : { 'secret' : process.env.IP_SECRET },
	headers: { 'Content-Type': 'application/json' }
};

var url = process.env.HEROKU_IP_TRACKER_URL + '/' + process.env.MACHINE_NAME;

function doApiCall() {
	client.put(url, args, function(data, response){
		if (data && data.name === process.env.MACHINE_NAME) {
			console.log('update sucessful');
		}
		else {
			console.error('error updating');
			console.error(response);
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