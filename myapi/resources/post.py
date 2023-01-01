from flask import request, jsonify
from flask_restful import Resource, abort
from datetime import datetime, timezone
import pymongo

from myapi.app import db, auth
from myapi.common.util import message, mongo_out

from bson.objectid import ObjectId

# FIELDS
def new_post(username, body):
    return {
        "username": username,
        "timestamp": datetime.now(timezone.utc),
        "body": body,
    }


class PostCollection(Resource):
    """
    Handle '/api/posts'
    - GET: Return all posts
    - POST: Create new post, require authentication to get current user
    """

    # return all posts
    def get(self):
        return mongo_out(db.posts.find().sort([('timestamp', pymongo.DESCENDING)]))
    
    # create new post - require user auth
    @auth.login_required
    def post(self):
        try:
            body = request.form['body']
        except:
            return abort(400, message="Invalid params. "
                f"Require ['body']."
            )
        else:
            post = new_post(auth.current_user()['username'], body)
            result = db.posts.insert_one(post)
            db.users.update_one(
                {"username": auth.current_user()['username']},
                {'$push': {"posts": result.inserted_id}}
            )
            return mongo_out(db.posts.find_one({"_id": result.inserted_id}))


class Post(Resource):
    """
    Handle '/api/posts/<post_id>'
    - GET: Return post
    - PUT: Edit post, requiring user authentication
    - DELETE: Delete post, requiring user authentication
    """

    # return post
    def get(self, post_id):
        try:
            resp = db.posts.find_one({"_id": ObjectId(post_id)})
        except:
            return abort(404, message=f"Post $oid:{post_id} does not exist.")
        else:
            return mongo_out(resp)
    
    # edit post, auth to ensure only author can edit
    @auth.login_required
    def put(self, post_id):
        body = request.form['body']
        post = db.posts.find_one({"_id": ObjectId(post_id)})
        if post['username'] == auth.current_user()['username']:
            db.posts.update_one({"_id": ObjectId(post_id)},
                {'$set': {"body": body}}
            )
            return mongo_out(db.posts.find_one({"_id": ObjectId(post_id)}))
        return abort(400, message=
            f"{auth.current_user()['username']} does not have access to edit post $oid:{post_id}"
        )

    # delete post
    @auth.login_required
    def delete(self, post_id):
        post = db.posts.find_one({"_id": ObjectId(post_id)})
        if post is None:
            return abort(404, message=f"Post $oid:{post_id} does not exist.")
        if auth.current_user()['username'] == post['username']:
            db.posts.delete_one({"_id": ObjectId(post_id)})
            db.users.update_one(
                {"username": post['username']},
                {'$pull': {"posts": ObjectId(post_id)}}
            )
            return message(f"Post $oid:{post_id} successfully deleted.")
        return abort(400, message=
            f"{auth.current_user()['username']} does not have access to delete post $oid:{post_id}"
        )