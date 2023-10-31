import bcrypt
import jwt
from bson import json_util
from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
import requests

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/risksmanagerdb'
SECRET_KEY = '1bb*3%%a13*a1%322a2$2b2$b2*b$c'
mongo = PyMongo(app)

CORS(app)
db_risks = mongo.db.risks
db_users = mongo.db.users


def token_validation(func):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token Lost'}), 401

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Expired Token'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid Token'}), 401

        username = payload.get('username')
        request.user = username

        return func(*args, **kwargs)

    return wrapper


@app.route('/get-token', methods=['POST'])
def get_token():
    username = request.json.get('username')
    password = request.json.get('password')

    user = db_users.find_one({'username': username})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({'username': username}, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token})
    else:
        return jsonify({'message': 'Wrong username and password'}), 401


# Start Risks views
@app.route('/risks', methods=['GET'], endpoint='get_risks')
@token_validation
def get_risks():
    risks = []
    for risk in db_risks.find():
        risks.append({
            '_id': str(ObjectId(risk['_id'])),
            'short_id': str(ObjectId(risk['_id']))[-6:],
            'name': risk['name'],
            'user': risk['user'],
            'country': risk['country'],
            'country_info': risk['country_info'],
            'impact': risk['impact'],
            'probability': risk['probability'],
            'level': risk['level'],
        })
    return jsonify(risks)


@app.route('/risk/<id>', methods=['GET'], endpoint='get_risk')
@token_validation
def get_risk(id):
    risk = db_risks.find_one({'_id': ObjectId(id)})
    response = json_util.dumps(risk)
    return Response(response, mimetype="application/json")


def get_country_data(request):
    country_name = request.json['country']
    response = requests.get(f'https://restcountries.com/v3/name/{country_name}')
    country_data = response.json()
    country_info = ''
    if response.status_code == 200 and country_data:
        country_info = '{0} {1}-{2}'.format(country_data[0]['cca2'],
                                            country_data[0]['name']['common'],
                                            country_data[0].get('capital', 'N/A')[0])

    return country_info


@app.route('/risk/create', methods=['POST'], endpoint='create_risk')
@token_validation
def create_risk():
    risk = db_risks.insert_one({
        'name': request.json['name'],
        'user': request.user,
        'country': request.json['country'],
        'country_info': get_country_data(request),
        'impact': request.json['impact'],
        'probability': request.json['probability'],
        'level': request.json['level'],
    })
    return jsonify(str(ObjectId(risk.inserted_id)))


@app.route('/risk/<id>', methods=['PUT'], endpoint='update_risk')
@token_validation
def update_risk(id):
    db_risks.update_one({'_id': ObjectId(id)}, {'$set': {
        'name': request.json['name'],
        'country': request.json['country'],
        'country_info': get_country_data(request),
        'impact': request.json['impact'],
        'probability': request.json['probability'],
        'level': request.json['level'],
    }})
    return jsonify({'message': 'Risk updated sucessfully'})


@app.route('/risk/<id>', methods=['DELETE'], endpoint='delete_risk')
@token_validation
def delete_risk(id):
    db_risks.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Risk deleted successfully'})

# End Risks views


# Start Users views
@app.route('/users', methods=['GET'], endpoint='get_users')
@token_validation
def get_users():
    users = []
    for user in db_users.find():
        users.append({
            '_id': str(ObjectId(user['_id'])),
            'username': user['username'],
            'password': '********'
        })
    return jsonify(users)


@app.route('/user/<id>', methods=['GET'], endpoint='get_user')
@token_validation
def get_user(id):
    user = db_users.find_one({'_id': ObjectId(id)})
    response = json_util.dumps(user)
    return Response(response, mimetype="application/json")


@app.route('/user/create', methods=['POST'], endpoint='create_user')
@token_validation
def create_user():
    username = request.json['username']
    raw_password = request.json['password']

    hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt())

    user = db_users.insert_one({
        'username': username,
        'password': hashed_password
    })
    return jsonify(str(ObjectId(user.inserted_id)))


@app.route('/user/<id>', methods=['PUT'], endpoint='update_user')
@token_validation
def update_user(id):
    username = request.json['username']
    raw_password = request.json['password']

    hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt())

    db_users.update_one({'_id': ObjectId(id)}, {'$set': {
        'username': username,
        'password': hashed_password
    }})
    return jsonify({'message': 'User Updated successfully'})


@app.route('/user/<id>', methods=['DELETE'], endpoint='delete_user')
@token_validation
def delete_user(id):
    db_users.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'User deleted'})

# End Users views


if __name__ == '__main__':
    app.run(debug=True)
