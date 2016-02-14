var HttpRequests = require('../utils/HttpRequests');

var TodoApi = {
	postTodo: function(dispatcher, id, text) {
		HttpRequests.post(dispatcher, id, text);
	},
	putTodo: function(dispatcher, id, text, complete) {
		HttpRequests.put(dispatcher, id, text, complete);
	},
	getTodos: function(dispatcher) {
		HttpRequests.get(dispatcher);
	},
	toggleTodos: function(dispatcher) {
		HttpRequests.toggle(dispatcher);
	}
};

module.exports = TodoApi;
