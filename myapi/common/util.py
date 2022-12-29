from flask import jsonify

from bson import json_util
import json

def message(msg):
    return jsonify({"message":msg})

def mongo_out(mongo_resp):
    return json.loads(json_util.dumps(mongo_resp))
