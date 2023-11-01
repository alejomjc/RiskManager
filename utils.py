import jwt
from flask import request, jsonify
import requests

SECRET_KEY = '1bb*3%%a13*a1%322a2$2b2$b2*b$c'


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