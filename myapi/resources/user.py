from flask import jsonify
from flask_restful import Resource, request, abort
from werkzeug.security import generate_password_hash, check_password_hash

from myapi.app import db
from myapi.common.util import message, mongo_out
from myapi.resources.login import login_required

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
            if len(params['username']) <= 2:
                return abort(400, message=f"Username should be 3 characters or more.")
            if params['username'].isspace():
                return abort(400, message=f"Username cannot contain spaces.")
            if len(params['password']) <= 2:
                return abort(400, message=f"Password should be 3 characters or more.")
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
    # TODO: handle get own user with full data if available, otherwise minimal data
    def get(self, username):
        if db.users.find_one({"username":username}) is not None:
            return mongo_out(db.users.find_one({"username": username}))
        else:
            return message(f"User {username} does not exist.")
    
    # update user info - require user auth
    @login_required
    def put(self, user, username):
        user_full = db.users.find_one({"username": user['username']})
        for field in request.form:
            if field in user_full:
                db.users.update_one(
                    {"username": user['username']},
                    {'$set': {
                        field: request.form[field]
                    }}
                )
                return mongo_out(db.users.find_one({"username":user['username']}))
    
    # delete user and all associated posts
    @login_required
    def delete(self, user, username):
        # if db.users.find_one({"username": username}) is not None:
        #     db.users.delete_one({"username": username})
        #     return message(f"User {username} has been deleted.")
        # else:
        #     return message(f"User {username} does not exist.")
        if user['username'] == username:
            user_full = db.users.find_one({"username": username})
            # if none incase token used to delete multiple times
            if user_full is not None:
                for post_id in user_full['posts']:
                    db.posts.delete_one({"_id": post_id})
                db.users.delete_one({"username": username})
                return message(f"User {username} has been deleted.")
            return abort(400, message=f"User {username} no longer exists.")
        return abort(401)