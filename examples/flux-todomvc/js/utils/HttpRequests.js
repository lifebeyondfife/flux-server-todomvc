var rp = require('request-promise');
var TodoConfig = require('../constants/TodoConfig');

var apiOptions = function() {
	return {
		uri: 'http://' + TodoConfig.HOST + ':' + TodoConfig.PORT + TodoConfig.PATH,
		json: true
	};
};

var HttpRequests = {
	post: function(callback, id, text) {
		this._requestWithBody(callback, id, text, false, 'POST');
	},

	put: function(callback, id, text, complete) {
		this._requestWithBody(callback, id, text, complete, 'PUT');
	},

	_requestWithBody: function(callback, id, text, complete, method) {
		var options = apiOptions();
		options.method = method;
		options.uri += '/' + id;
		options.body = {text: text, id: id, complete: complete};

		rp(options).
			then(function(parsedBody) {
				callback();
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
	},

	toggle: function(callback) {
		var options = apiOptions();
		options.method = 'POST';
		options.uri += '/toggle';

		rp(options).
			then(function(parsedBody) {
				callback();
			}).
			catch(function(err) {
				console.log('Error toggling todos.');
				console.log(err);
			});
	},

	toggle: function(callback) {
		var options = apiOptions();
		options.method = 'POST';
		options.uri += '/deleteCompleted';

		rp(options).
			then(function(parsedBody) {
				callback();
			}).
			catch(function(err) {
				console.log('Error toggling todos.');
				console.log(err);
			});
	},

	delete: function(callback, id) {
		var options = apiOptions();
		options.method = 'DELETE';
		options.uri += '/' + id;

		rp(options).
			then(function(parsedBody) {
				callback();
			}).
			catch(function(err) {
				console.log('Error deleting todo "' + id + '".');
				console.log(err);
			});
	}
};

module.exports = HttpRequests;
