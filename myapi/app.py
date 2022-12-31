from flask import Flask
from pymongo import MongoClient
from flask_restful import Resource, Api

from dotenv import load_dotenv
from myapi.config import Config
from flask_httpauth import HTTPBasicAuth

# app/api init
app = Flask(__name__)
load_dotenv()
app.config.from_object(Config)
api = Api(app)

# db init
client = MongoClient(app.config['MONGO_URI'])
db = client.api_db

# auth
auth = HTTPBasicAuth()

# resources

# USERS
#
# GET   '/api/users'            -> RETURN ALL USERS
# POST  '/api/users'            -> CREATE NEW USER
# GET   '/api/users/[username]' -> RETURN USER
# PUT   '/api/users/[username]' -> UPDATE USER INFO - require user auth
# DELETE'/api/users/[username]' -> DELETE USER
#
# POSTS
#
# GET   '/api/posts'            -> RETURN ALL POSTS
# GET   '/api/posts/[post_id]   -> RETURN POST
# POST  '/api/posts'            -> CREATE NEW POST  - require user auth
# PUT   '/api/posts/[post_id]   -> EDIT POST        - to determine
# DELETE'/api/posts/[post_id]   -> DELETE POST      - the post author
#
# GET   '/api/posts/[username]' -> RETURN ALL POSTS BY USER


from myapi.resources.user import UserCollection, User
from myapi.resources.post import PostCollection, Post

api.add_resource(UserCollection, '/api/users')
api.add_resource(User, '/api/users/<string:username>')

api.add_resource(PostCollection, '/api/posts')
api.add_resource(Post, '/api/posts/<string:post_id>')