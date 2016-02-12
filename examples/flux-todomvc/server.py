# This file provided by Facebook is for non-commercial testing and evaluation
# purposes only. Facebook reserves all rights not expressly granted.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
# ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import json
import os
from flask import Flask, Response, request

app = Flask(__name__, static_url_path='', static_folder='.')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))


@app.route('/api/todos', methods=['GET'])
def get_todos():
	with open('todos.json', 'r') as file:
		todos = json.loads(file.read())

	return Response(json.dumps(todos),
					mimetype='application/json',
					headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})


@app.route('/api/todos/<id>', methods=['POST', 'PUT'])
def post_or_put_todo(id):
	with open('todos.json', 'r') as file:
		todos = json.loads(file.read())

	text = json.loads(request.data.decode())['text']
	todos[id] = {'text': text, 'complete': False}

	with open('todos.json', 'w') as file:
		file.write(json.dumps(todos, indent=4, separators=(',', ': ')))

	return Response(json.dumps(todos),
					mimetype='application/json',
					headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})


@app.route('/api/todos/<id>', methods=['DELETE'])
def delete_todo(id):
	with open('todos.json', 'r') as file:
		todos = json.loads(file.read())

	todos.pop(id, None)

	with open('todos.json', 'w') as file:
		file.write(json.dumps(todos, indent=4, separators=(',', ': ')))

	return Response(json.dumps(todos),
					mimetype='application/json',
					headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})


@app.route('/api/todos/delete_complete', methods=['DELETE'])
def delete_complete():
	with open('todos.json', 'r') as file:
		todos = json.loads(file.read())

	todos = dict(filter(lambda kvp: not kvp[1].complete, todos.items()))

	with open('todos.json', 'w') as file:
		file.write(json.dumps(todos, indent=4, separators=(',', ': ')))

	return Response(json.dumps(todos),
					mimetype='application/json',
					headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})


if __name__ == '__main__':
	app.run(port=int(os.environ.get("PORT", 3000)))
