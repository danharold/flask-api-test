from flask import jsonify
from flask_restful import Resource, request, abort
from werkzeug.security import generate_password_hash, check_password_hash

from myapi.app import db, auth
from myapi.common.util import message, mongo_out

# AUTH
@auth.verify_password
def verify_password(username, password):
    user = db.users.find_one({"username": username})
    if user is not None and check_password_hash(user['password_hash'], password):
        return mongo_out(user)

# FIELDS
def new_user(params):
    return {
        "username": str.lower(params['username']),
        "display_username": params['display_username'],
        "email": params['email'],
        "password_hash": generate_password_hash(params['password']),
        "info": {
            "about_me": ""
        },
        "posts": [

        ],
    }


new_user_params = ['username', 'display_username', 'email', 'password']

class UserCollection(Resource):
    """
    Handle '/api/users'
    - GET: Return all users
    - POST: Create new user
        > Form params: [username, display_username, email, password_hash]
    """

    def get(self):
        return jsonify({"users": mongo_out(db.users.find({}, 
            {"_id":1,"username":1}
        ))})

    # create new user
    def post(self):
        try:
            params = {}
            for param in new_user_params:
                params[param] = request.form[param]
        except:
            return abort(400, message="Invalid params. "
                f"Require {new_user_params}.")
        else:
            if db.users.find_one({"username": str.lower(params['username'])}) is None:
                db.users.insert_one(new_user(params))
                return mongo_out(db.users.find_one({"username":str.lower(params['username'])})), 201
            else:
                return abort(400, message=f"User {str.lower(params['username'])} already exists")


class User(Resource):
    """
    Handle '/api/users/<username>'
    - GET: Return user
    - PUT: Update user info, requiring user authentication
        > Form params: [display_username, email, password_hash]
    - DELETE: Delete user
    """

    # return specified user
    # TODO: ensure hashes and other private data is not publicly exposed
    def get(self, username):
        if db.users.find_one({"username":username}) is not None:
            return mongo_out(db.users.find_one({"username": username}))
        else:
            return message(f"User {username} does not exist.")
    
    # update user info - require user auth
    @auth.login_required
    def put(self, username):
        for field in request.form:
            if field in auth.current_user():
                db.users.update_one(
                    {"username": auth.current_user()['username']},
                    {'$set': {
                        field: request.form[field]
                    }}
                )
                return mongo_out(db.users.find_one({"username":auth.current_user()['username']}))
    
    # delete user
    def delete(self, username):
        if db.users.find_one({"username": username}) is not None:
            db.users.delete_one({"username": username})
            return message(f"User {username} has been deleted.")
        else:
            return message(f"User {username} does not exist.")