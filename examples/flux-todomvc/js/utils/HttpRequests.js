var rp = require('request-promise');
var TodoConfig = require('../constants/TodoConfig');

var apiOptions = function() {
	return {
		uri: 'http://' + TodoConfig.HOST + ':' + TodoConfig.PORT + TodoConfig.PATH,
		json: true
	};
};

var HttpRequests = {
	post: function(callback, id, data) {
		this._requestWithBody(callback, id, data, 'POST');
	},

	put: function(callback, id, data) {
		this._requestWithBody(callback, id, data, 'PUT');
	},

	_requestWithBody: function(callback, id, data, method) {
		var options = apiOptions();
		options.method = method;
		options.uri += '/' + id;
		options.body = {text: data};

		console.log(options);

		rp(options).
			then(function(parsedBody) {
				callback(parsedBody);
			}).
			catch(function(err) {
				console.log('Error sending todo "' + id + '".');
				console.log(err);
			});
	},

	get: function(callback) {
		var options = apiOptions();
		options.method = 'GET';

		rp(options).
			then(function(parsedBody) {
				callback(parsedBody);
			}).
			catch(function(err) {
				console.log('Error getting todos from server.');
			});
	}
};

module.exports = HttpRequests;
