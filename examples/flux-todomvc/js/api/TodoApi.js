var HttpRequests = require('../utils/HttpRequests');

var TodoApi = {
	postTodo: function(dispatcher, id, text) {
		HttpRequests.post(dispatcher, id, text);
	},
	putTodo: function(dispatcher, id, text) {
		HttpRequests.put(dispatcher, id, text);
	},
	getTodos: function(dispatcher) {
		HttpRequests.get(dispatcher);
	}
};

module.exports = TodoApi;
