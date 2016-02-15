var rp = require('request-promise');
var TodoConfig = require('../constants/TodoConfig');

var apiOptions = function() {
	return {
		uri: 'http://' + TodoConfig.HOST + ':' + TodoConfig.PORT + TodoConfig.PATH,
		json: true
	};
};

var HttpRequests = {
	request: function(callback, method, endpoint, data) {
		var options = apiOptions();
		options.method = method;
		options.uri += endpoint;

		if (data) {
			options.body = data;
		}

		rp(options).
			then(function(parsedBody) {
				callback(parsedBody);
			}).
			catch(function(err) {
				console.log('Error with http request.');
				console.log(err);
			});
	}
};

module.exports = HttpRequests;
