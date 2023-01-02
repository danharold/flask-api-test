from flask import request, jsonify
from flask_restful import Resource, abort
from werkzeug.security import generate_password_hash, check_password_hash

import jwt
from datetime import datetime, timezone, timedelta

from myapi.app import app, db
from myapi.common.util import message, mongo_out

class Login(Resource):
    """
    Handle '/api/users/login'
    - POST: Create new auth token for user login
    """

    # validate user and generate token
    def post(self):
        try:
            user = self.verify_password(request.form['username'], request.form['password'])
        except:
            return abort(400, message="Require ['username', 'password'].")
        if user is not None:
            payload = {
                "username": user['username'],
                "exp": datetime.now(timezone.utc) + timedelta(minutes=5)
            }
            token = jwt.encode(payload, app.secret_key, algorithm='HS256')
            return jsonify({"auth-token": token})
        return abort(400, message="Invalid username and password.")

    @staticmethod
    def verify_password(username, password):
        user = db.users.find_one({"username": username})
        if user is not None and check_password_hash(user['password_hash'], password):
            return mongo_out(user)