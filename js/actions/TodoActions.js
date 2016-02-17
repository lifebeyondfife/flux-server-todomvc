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
		TodoApi.getTodos().
			then(function(todos) {
				AppDispatcher.dispatch({
					actionType: TodoConstants.TODO_GET_ALL,
					todos: todos
				});
			}).
			catch(function(err) {
				console.log('Error with getting todos.');
				console.log(err);
			});
	},

  /**
   * @param  {string} text
   */
	create: function(text) {
		var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

		TodoApi.createTodo(id, text).
			then(function() {
				AppDispatcher.dispatch({
					actionType: TodoConstants.TODO_CREATE,
					id: id,
					text: text
				});
			}).
			catch(function(err) {
				console.log('Error with creating todo.');
				console.log(err);
			});
	},

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
	updateText: function(id, text, complete) {
		TodoApi.updateTodo(id, text, complete).
			then(function() {
				AppDispatcher.dispatch({
					actionType: TodoConstants.TODO_UPDATE_TEXT,
					id: id,
					text: text
				});
			}).
			catch(function(err) {
				console.log('Error with creating todo.');
				console.log(err);
			});
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

		TodoApi.updateTodo(id, todo.text, !todo.complete).
			then(function() {
				AppDispatcher.dispatch({
					actionType: actionType,
					id: id
				});
			}).
			catch(function(err) {
				console.log('Error marking todo complete.');
				console.log(err);
			});
	},

  /**
   * Mark all ToDos as complete
   */
	toggleCompleteAll: function() {
		TodoApi.toggleTodos().
			then(function() {
				AppDispatcher.dispatch({
					actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
				});
			}).
			catch(function(err) {
				console.log('Error toggling todos.');
				console.log(err);
			});
	},

  /**
   * @param  {string} id
   */
	destroy: function(id) {
		TodoApi.deleteTodo(id).
			then(function() {
				AppDispatcher.dispatch({
					actionType: TodoConstants.TODO_DESTROY,
					id: id
				});
			}).
			catch(function(err) {
				console.log('Error deleting todo.');
				console.log(err);
			});
	},

  /**
   * Delete all the completed ToDos
   */
	destroyCompleted: function() {
		TodoApi.deleteCompleted().
			then(function() {
				AppDispatcher.dispatch({
					actionType: TodoConstants.TODO_DESTROY_COMPLETED
				});
			}).
			catch(function(err) {
				console.log('Error deleting completed todos.');
				console.log(err);
			});
	}

};

module.exports = TodoActions;
