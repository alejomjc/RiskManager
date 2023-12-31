import bcrypt
import jwt
from bson import json_util
from flask import Flask, request, Response
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
from utils import token_validation, SECRET_KEY, get_country_data, session, create_admin_user, create_base_data_risk
from flasgger import Swagger, swag_from

app = Flask(__name__)
swagger = Swagger(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/risksmanagerdb'
mongo = PyMongo(app)

CORS(app)
db_risks = mongo.db.risks
db_users = mongo.db.users


# Start Login and Logout view
@app.route('/login', methods=['POST'], endpoint='login')
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = db_users.find_one({'username': username})

    if not user and username == 'admin':
        create_admin_user(db_users)
        create_base_data_risk(db_risks)

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        session['username'] = username
        session['password'] = password
        get_token()
        return Response(json_util.dumps({'message': 'OK'}), mimetype="application/json")
    else:
        return Response(json_util.dumps({'message': 'Wrong username and password'}),
                        mimetype="application/json",
                        status=401)


@app.route('/logout', methods=['POST'], endpoint='logout')
def logout():
    session['user'] = None
    session['token'] = None
    session['username'] = None
    session['password'] = None

    return Response(json_util.dumps({'message': 'OK'}), mimetype="application/json")

# End Login view


# Start Token view
@app.route('/get-token', methods=['POST'])
@swag_from('swagger_config/get_token.yml')
def get_token():
    username = request.json.get('username')
    password = request.json.get('password')

    if not username:
        username = session['username']
        password = session['password']

    user = db_users.find_one({'username': username})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({'username': username}, SECRET_KEY, algorithm='HS256')
        session['token'] = token
        return Response(json_util.dumps({'token': token}), mimetype="application/json")
    else:
        return Response(json_util.dumps({'message': 'Wrong username and password'}),
                        mimetype="application/json",
                        status=401)

# End Token view


# Start Risks views
@app.route('/risks', methods=['GET'], endpoint='get_risks')
@swag_from('swagger_config/risks/get_risks.yml')
@token_validation
def get_risks():
    risks = list(db_risks.find())

    for risk in risks:
        risk['_id'] = str(risk['_id'])
        risk['short_id'] = str(risk['_id'])[-6:]

    response = json_util.dumps(risks)
    return Response(response, mimetype="application/json")


@app.route('/risk/<id>', methods=['GET'], endpoint='get_risk')
@swag_from('swagger_config/risks/get_risk.yml')
@token_validation
def get_risk(id):
    risk = db_risks.find_one({'_id': ObjectId(id)})
    if risk:
        response = json_util.dumps(risk)
        return Response(response, mimetype="application/json")
    else:
        response = {'message': 'Risk not found'}
        return Response(response, mimetype="application/json", status=404)


@app.route('/risk/create', methods=['POST'], endpoint='create_risk')
@swag_from('swagger_config/risks/create_risk.yml')
@token_validation
def create_risk():
    risk = db_risks.insert_one({
        'name': request.json['name'],
        'description': request.json['description'],
        'user': session['username'],
        'provider': request.json['provider'],
        'country': request.json['country'],
        'country_info': get_country_data(request),
        'impact': request.json['impact'],
        'probability': request.json['probability'],
        'level': request.json['level'],
    })

    response_data = {
        'risk_id': str(ObjectId(risk.inserted_id)),
        'message': 'Risk created successfully'
    }
    response = json_util.dumps(response_data)

    return Response(response, mimetype="application/json")


@app.route('/risk/<id>', methods=['PUT'], endpoint='update_risk')
@swag_from('swagger_config/risks/update_risk.yml')
@token_validation
def update_risk(id):
    db_risks.update_one({'_id': ObjectId(id)}, {'$set': {
        'name': request.json['name'],
        'description': request.json['description'],
        'user': session['username'],
        'provider': request.json['provider'],
        'country': request.json['country'],
        'country_info': get_country_data(request),
        'impact': request.json['impact'],
        'probability': request.json['probability'],
        'level': request.json['level'],
    }})

    response_data = {
        'message': 'Risk updated successfully'
    }
    response = json_util.dumps(response_data)

    return Response(response, mimetype="application/json")


@app.route('/risk/<id>', methods=['DELETE'], endpoint='delete_risk')
@swag_from('swagger_config/risks/delete_risk.yml')
@token_validation
def delete_risk(id):
    db_risks.delete_one({'_id': ObjectId(id)})

    response_data = {
        'message': 'Risk deleted successfully'
    }
    response = json_util.dumps(response_data)

    return Response(response, mimetype="application/json")

# End Risks views


# Start Users views
@app.route('/users', methods=['GET'], endpoint='get_users')
@swag_from('swagger_config/users/get_users.yml')
@token_validation
def get_users():
    users = list(db_users.find({}, {'password': 0}))
    for user in users:
        user['_id'] = str(user['_id'])
        user['password'] = '********'
    response = json_util.dumps(users)
    return Response(response, mimetype="application/json")


@app.route('/user/<id>', methods=['GET'], endpoint='get_user')
@swag_from('swagger_config/users/get_user.yml')
@token_validation
def get_user(id):
    user = db_users.find_one({'_id': ObjectId(id)}, {'password': 0})
    if user:
        user['_id'] = str(user['_id'])
        response = json_util.dumps(user)
        return Response(response, mimetype="application/json")
    else:
        response = {'message': 'User not found'}
        return Response(response, mimetype="application/json", status=404)


@app.route('/user/create', methods=['POST'], endpoint='create_user')
@swag_from('swagger_config/users/create_user.yml')
@token_validation
def create_user():
    username = request.json['username']
    raw_password = request.json['password']

    hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt())

    user = db_users.insert_one({
        'username': username,
        'password': hashed_password
    })
    response_data = {
        'user_id': str(ObjectId(user.inserted_id)),
        'message': 'User created successfully'
    }
    response = json_util.dumps(response_data)
    return Response(response, mimetype="application/json")


@app.route('/user/<id>', methods=['PUT'], endpoint='update_user')
@swag_from('swagger_config/users/update_user.yml')
@token_validation
def update_user(id):
    username = request.json['username']
    raw_password = request.json['password']

    hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt())

    db_users.update_one({'_id': ObjectId(id)}, {'$set': {
        'username': username,
        'password': hashed_password
    }})
    response_data = {
        'message': 'User updated successfully'
    }
    response = json_util.dumps(response_data)
    return Response(response, mimetype="application/json")


@app.route('/user/<id>', methods=['DELETE'], endpoint='delete_user')
@swag_from('swagger_config/users/delete_user.yml')
@token_validation
def delete_user(id):
    db_users.delete_one({'_id': ObjectId(id)})
    response_data = {
        'message': 'User deleted successfully'
    }
    response = json_util.dumps(response_data)
    return Response(response, mimetype="application/json")

# End Users views


if __name__ == '__main__':
    app.run(debug=True)
