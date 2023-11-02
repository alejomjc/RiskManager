import json
import unittest
from app import app
from utils import session


class FlaskTest(unittest.TestCase):
    token = None

    def setUp(self):
        self.app = app.test_client()

    def test_get_token_rest(self):
        user = {
            'username': 'admin',
            'password': 'admin'
        }
        response = self.app.post('/get-token', json=user, content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response_data = json.loads(response.data)
        self.assertIsNotNone(response_data)
        FlaskTest.token = response_data['token']

    def test_get_risks(self):
        response = self.app.post('/logout', content_type='application/json', headers={'Authorization': FlaskTest.token})
        self.assertEqual(response.status_code, 200)
        response = self.app.get('/risks')
        self.assertEqual(response.status_code, 401)

    def test_get_token_session(self):
        session['username'] = 'admin'
        session['password'] = 'admin'

        response = self.app.post('/get-token', json={}, content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response_data = json.loads(response.data)
        self.assertIsNotNone(response_data)
        FlaskTest.token = response_data['token']

    def test_get_users(self):
        response = self.app.post('/logout', content_type='application/json', headers={'Authorization': FlaskTest.token})
        self.assertEqual(response.status_code, 200)
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 401)


if __name__ == '__main__':
    unittest.main()
