from flask import request, jsonify
from flask_restful import Resource, abort

from bson import json_util
import json

from myapi.app import app, api, client, todos



# def abort_if_todo_doesnt_exist(todo_id):
#     if todo_id not in mongo.db.todos:
#         abort(404, message="Todo {} doesn't exist".format(todo_id))

class Todo(Resource):
    def get(self, todo_id):
        todo = {"todo_id": todo_id, "data": "MEOW"}
        # client.todo_db.todos.insert_one(todo)
        return json.loads(json_util.dumps(client.todo_db.todos.find_one({"todo_id": todo_id})))
        
    def put(self, todo_id):
        todo = {"todo_id": todo_id, "data": request.args['data']}
        client.todo_db.todos.insert_one(todo)
        return json.loads(json_util.dumps(client.todo_db.todos.find_one({"todo_id": todo_id})))