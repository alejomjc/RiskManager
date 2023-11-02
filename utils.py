import jwt
import bcrypt
from flask import request, jsonify
import requests

from data import risk_data

SECRET_KEY = '1bb*3%%a13*a1%322a2$2b2$b2*b$c'

session = {
    'user': '',
    'token': '',
    'username': '',
    'password': ''
}


def token_validation(func):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            if session['token']:
                token = session['token']
            else:
                return jsonify({'message': 'Token Lost'}), 401

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Expired Token'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid Token'}), 401

        session['username'] = payload.get('username')

        return func(*args, **kwargs)

    return wrapper


def get_country_data(request):
    country_name = request.json['country']
    response = requests.get(f'https://restcountries.com/v3/translation/{country_name}')
    country_data = response.json()
    country_info = ''
    if response.status_code == 200 and country_data:
        country_info = '{0} {1}-{2}'.format(country_data[0]['cca2'],
                                            country_data[0]['name']['common'],
                                            country_data[0].get('capital', 'N/A')[0])

    return country_info


def create_admin_user(db_users):
    admin = db_users.find_one({'username': 'admin'})
    if not admin:
        db_users.insert_one({
            'username': 'admin',
            'password': bcrypt.hashpw('admin'.encode('utf-8'), bcrypt.gensalt())
        })


def create_base_data_risk(db_risks):
    db_risks.insert_many(risk_data)
