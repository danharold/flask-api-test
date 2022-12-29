from flask import request, jsonify
from flask_restful import Resource, abort
from datetime import datetime, timezone

from myapi.app import db
from myapi.common.util import message, mongo_out

from bson.objectid import ObjectId

# FIELDS
def new_post(params):
    return {
        "username": params['username'],
        "timestamp": datetime.now(timezone.utc),
        "body": params['body'],
    }


new_post_params = ['username', 'body']

class PostCollection(Resource):
    """
    Handle '/api/posts'
    - GET: Return all posts
    - POST: Create new post
    """

    # return all posts
    def get(self):
        return mongo_out(db.posts.find())
    
    # create new post
    def post(self):
        try:
            params = {}
            for param in new_post_params:
                params[param] = request.form[param]
        except:
            return abort(400, message="Invalid params. "
                f"Require {new_post_params}."
            )
        else:
            post = new_post(params)
            result = db.posts.insert_one(post)
            db.users.update_one(
                {"username":params['username']},
                {'$push': {"posts": result.inserted_id}}
            )
            return mongo_out(db.posts.find_one({"_id": result.inserted_id}))


class Post(Resource):
    """
    Handle '/api/posts/<post_id>'
    - GET: Return post
    - PUT: Edit post
    - DELETE: Delete post
    """

    # return post
    def get(self, post_id):
        try:
            resp = db.posts.find_one({"_id": ObjectId(post_id)})
        except:
            return abort(404, message=f"Post $oid:{post_id} does not exist.")
        else:
            return mongo_out(resp)
    
    # edit post
    def put(self, post_id):
        body = request.form['body']
        db.posts.update_one({"_id": ObjectId(post_id)},
            {'$set': {"body": body}}
        )
        return mongo_out(db.posts.find_one({"_id": ObjectId(post_id)}))

    # delete post
    def delete(self, post_id):
        resp = db.posts.find_one({"_id": ObjectId(post_id)})

        if resp is None:
            return abort(404, message=f"Post $oid:{post_id} does not exist.")
        else:
            db.posts.delete_one({"_id": ObjectId(post_id)})
            db.users.update_one(
                {"username": resp['username']},
                {'$pull': {"posts": ObjectId(post_id)}}
            )
            return message(f"Post $oid:{post_id} successfully deleted.")
