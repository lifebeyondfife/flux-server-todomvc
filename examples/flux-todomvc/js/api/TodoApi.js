var HttpRequests = require('../utils/HttpRequests');

var TodoApi = {
	createTodo: function(dispatcher, id, text) {
		var data = {
			id: id,
			text: text,
			complete: false
		};
		HttpRequests.request(dispatcher, 'POST', '/' + id, data);
	},
	updateTodo: function(dispatcher, id, text, complete) {
		var data = {
			id: id,
			text: text,
			complete: complete
		};
		HttpRequests.request(dispatcher, 'PUT', '/' + id, data);
	},
	getTodos: function(dispatcher) {
		HttpRequests.request(dispatcher, 'GET', '');
	},
	toggleTodos: function(dispatcher) {
		HttpRequests.request(dispatcher, 'POST', '/toggle');
	},
	deleteTodo: function(dispatcher, id) {
		HttpRequests.request(dispatcher, 'DELETE', '/' + id);
	},
	deleteCompleted: function(dispatcher) {
		HttpRequests.request(dispatcher, 'POST', '/delete_complete');
	}
};

module.exports = TodoApi;
