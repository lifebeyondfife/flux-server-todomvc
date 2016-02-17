var rp = require('request-promise');
var TodoConfig = require('../constants/TodoConfig');

var apiOptions = function() {
	return {
		uri: 'http://' + TodoConfig.HOST + ':' + TodoConfig.PORT + TodoConfig.PATH,
		json: true
	};
};

var HttpRequests = {
	request: function(method, endpoint, data) {
		var options = apiOptions();
		options.method = method;
		options.uri += endpoint;

		if (data) {
			options.body = data;
		}

		return rp(options);
	}
};

module.exports = HttpRequests;
