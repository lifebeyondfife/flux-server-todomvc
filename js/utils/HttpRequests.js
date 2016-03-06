var Promise = require('promise');
var http = require('http');
var TodoConfig = require('../constants/TodoConfig');

var apiOptions = function(method, endpoint) {
	return {
		hostname: TodoConfig.HOST,
		port: TodoConfig.PORT,
		path: TodoConfig.PATH + endpoint,
		method: method,
		headers: {
			'Content-type': 'application/json'
		}
	};
};

var HttpRequests = {
	request: function(method, endpoint, data) {
		var options = apiOptions(method, endpoint);
		var postData = '';

		if (data) {
			var postData = JSON.stringify(data);
			options.headers['Content-Length'] = postData.length;
		}

		return new Promise(function(fulfill, reject) {
			var httpReq = http.request(options, function(response) {
				var body = '';

				if (response.statusCode >= 400) {
					reject(error);
					return;
				}

				response.on('data', function(chunk) {
					body += chunk;
				});

				response.on('end', function() {
					fulfill(JSON.parse(body));
				});
			});

			httpReq.on('error', function(error) {
				reject(error);
			});

			httpReq.write(postData);
			httpReq.end();
		});
	}
};

module.exports = HttpRequests;
