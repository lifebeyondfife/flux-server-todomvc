/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var TodoApi = require('../api/TodoApi');

var TodoActions = {
	getAllTodos: function() {
		var dispatcher = function(todos) {
			AppDispatcher.dispatch({
				actionType: TodoConstants.TODO_GET_ALL,
				todos: todos
			});
		};

		TodoApi.getTodos(dispatcher);
	},

  /**
   * @param  {string} text
   */
	create: function(text) {
		var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

		var dispatcher = function() {
			AppDispatcher.dispatch({
				actionType: TodoConstants.TODO_CREATE,
				id: id,
				text: text
			});
		};

		TodoApi.postTodo(dispatcher, id, text);
	},

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
	updateText: function(id, text, complete) {
		var dispatcher = function() {
			AppDispatcher.dispatch({
				actionType: TodoConstants.TODO_UPDATE_TEXT,
				id: id,
				text: text
			});
		};

		TodoApi.putTodo(dispatcher, id, text, complete);
	},

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
	toggleComplete: function(todo) {
		var id = todo.id;
		var actionType = todo.complete ?
			TodoConstants.TODO_UNDO_COMPLETE :
			TodoConstants.TODO_COMPLETE;

		var dispatcher = function() {
			AppDispatcher.dispatch({
				actionType: actionType,
				id: id
			});
		};

		TodoApi.putTodo(dispatcher, id, todo.text, !todo.complete);
	},

  /**
   * Mark all ToDos as complete
   */
	toggleCompleteAll: function() {
		var dispatcher = function() {
			AppDispatcher.dispatch({
				actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
			});
		};

		TodoApi.toggleTodos(dispatcher);
	},

  /**
   * @param  {string} id
   */
	destroy: function(id) {
		var dispatcher = function() {
			AppDispatcher.dispatch({
				actionType: TodoConstants.TODO_DESTROY,
				id: id
			});
		};

		TodoApi.deleteTodo(dispatcher, id);
	},

  /**
   * Delete all the completed ToDos
   */
	destroyCompleted: function() {
		var dispatcher = function() {
			AppDispatcher.dispatch({
				actionType: TodoConstants.TODO_DESTROY_COMPLETED
			});
		};

		TodoApi.deleteCompleted(dispatcher);
	}

};

module.exports = TodoActions;
