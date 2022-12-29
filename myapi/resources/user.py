from flask_restful import Resource, request, abort

from myapi.app import db
from myapi.common.util import message, mongo_out

# FIELDS
def new_user(params):
    return {
        "username": params['username'],
        "display_username": params['display_username'],
        "email": params['email'],
        "passwordHash": params['password_hash'],
        "info": {
            "about_me": ""
        },
        "posts": [

        ],
    }

post_params = ['username', 'display_username', 'email', 'password_hash']

class UserCollection(Resource):
    """
    Handle '/api/users'
    - GET: Return all users
    - POST: Create new user
        > Form params: [username, display_username, email, password_hash]
    """
    def __init__(self):
        self.post_params = ['username', 'display_username', 'email', 'password_hash']

    def get(self):
        pass

    # create new user
    def post(self):
        try:
            params = {}
            for param in post_params:
                params[param] = request.form[param]
        except:
            return abort(400, message="Invalid params. "
                f"Require {self.post_params}.")
        else:
            if db.users.find_one({"username": params['username']}) is None:
                db.users.insert_one(new_user(params))
                return mongo_out(db.users.find_one({"username":params['username']}))
            else:
                return abort(400, message=f"User {params['username']} already exists")



class User(Resource):
    """
    Handle '/api/users/<username>'
    - GET: Return specified user
    - PUT: Update user info
        > Form params: [display_username, email, password_hash]
    - DELETE: Delete user info
    """

    # return specified user
    def get(self, username):
        if db.users.find_one({"username":username}) is not None:
            return mongo_out(db.users.find_one({"username": username}))
        else:
            return message(f"User {username} does not exist.")


    
        



class UserOld(Resource):
    # retrieve user
    def get(self, username):
        if db.users.find_one({"username":username}) is not None:
            return mongo_out(db.users.find_one({"username": username}))
        else:
            return message(f"User {username} does not exist.")

    # new user
    def put(self, username):
        if db.users.find_one({"username": username}) is None:
            display_username = request.form['display_username']
            email = request.form['email']
            password_hash = request.form['password_hash']
            if display_username and email and password_hash:
                db.users.insert_one(new_user(
                    username, display_username, email, password_hash
                ))
                return mongo_out(db.users.find_one({"username":username}))
            else:
                return message("Invalid params.")
        else:
            return message(f"User {username} already exists.")

    # update user info
    def post(self, username):
        resp = db.users.find_one({"username": username})
        if resp is not None:
            for field in request.form:
                if field in mongo_out(resp):
                    db.users.update_one({"username":username},
                        {'$set': {
                            field: request.form[field]
                        }}
                    )
            return mongo_out(db.users.find_one({"username":username}))
        else:
            return message(f"User {username} does not exist.")
    
    # delete user
    def delete(self, username):
        if db.users.find_one({"username": username}) is not None:
            db.users.delete_one({"username": username})
            return message(f"User {username} has been deleted.")
        else:
            return message(f"User {username} does not exist.")
