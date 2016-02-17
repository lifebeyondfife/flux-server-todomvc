var HttpRequests = require('../utils/HttpRequests');

var TodoApi = {
	createTodo: function(id, text) {
		var data = {
			id: id,
			text: text,
			complete: false
		};
		return HttpRequests.request('POST', '/' + id, data);
	},
	updateTodo: function(id, text, complete) {
		var data = {
			id: id,
			text: text,
			complete: complete
		};
		return HttpRequests.request('PUT', '/' + id, data);
	},
	getTodos: function() {
		return HttpRequests.request('GET', '');
	},
	toggleTodos: function() {
		return HttpRequests.request('POST', '/toggle');
	},
	deleteTodo: function(id) {
		return HttpRequests.request('DELETE', '/' + id);
	},
	deleteCompleted: function() {
		return HttpRequests.request('POST', '/delete_complete');
	}
};

module.exports = TodoApi;
