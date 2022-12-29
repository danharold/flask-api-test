from flask import request, jsonify
from flask_restful import Resource
from datetime import datetime, timezone

from myapi.app import db
from myapi.common.util import message, mongo_out

from bson.objectid import ObjectId

# FIELDS
def new_post(username, body, timestamp):
    return {
        "username": username,
        "timestamp": timestamp,
        "body": body,
    }

class Post(Resource):
    def get(self, username):
        return mongo_out(db.posts.find({"username":username}))

    # create new post
    def put(self, username):
        try:
            body = request.form['body']
        except:
            return message(f"Field 'body' empty.")
        else:
            post = new_post(username, body, datetime.now(timezone.utc))
            result = db.posts.insert_one(post)
            db.users.update_one(
                {"username":username},
                {'$push': {"posts": result.inserted_id}}
            )
            return new_post(username, body, str(datetime.now(timezone.utc)))
    
    def delete(self, username):
        try:
            oid = request.form['id']
        except:
            return message(f"Field 'id' empty.")
        else:
            resp = db.posts.find_one({"_id": ObjectId(oid)})
            if resp is not None:
                db.posts.delete_one({"_id": ObjectId(oid)})
                db.users.update_one(
                    {"username": resp['username']},
                    {'$pull': {"posts": ObjectId(oid)}}
                )
                return message(f"Post $oid:{oid} deleted.")
            else:
                return message(f"Post $oid:{oid} does not exist.")

       