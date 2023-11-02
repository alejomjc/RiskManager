import json
import unittest
from app import app


class FlaskTest(unittest.TestCase):
    created_user_id = None

    def setUp(self):
        self.app = app.test_client()

    def test_0_login(self):
        user = {
            'username': 'admin',
            'password': 'admin'
        }
        response = self.app.post('/login', json=user, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_1_create_user(self):
        data = {
            'username': 'juan',
            'password': 'Juan123',
        }

        response = self.app.post('/user/create', json=data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

        response_data = json.loads(response.data)
        self.assertIsNotNone(response_data)

        response = self.app.post('/login', json=data, content_type='application/json')
        self.assertEqual(response.status_code, 200)

        FlaskTest.created_user_id = response_data['user_id']

    def test_2_get_users(self):
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

    def test_3_get_user(self):
        response = self.app.get(f'/user/{FlaskTest.created_user_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

    def test_4_update_user(self):
        data = {
            'username': 'carlos',
            'password': 'Carlos123',
        }

        response = self.app.put(f'/user/{FlaskTest.created_user_id}', json=data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

        response = self.app.get(f'/user/{FlaskTest.created_user_id}')
        self.assertEqual(response.status_code, 200)

        response = self.app.post('/login', json=data, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_5_delete_user(self):
        response = self.app.delete(f'/user/{FlaskTest.created_user_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

        response = self.app.get(f'/user/{FlaskTest.created_user_id}')
        self.assertEqual(response.status_code, 404)

    def test_6_logout(self):
        response = self.app.post('/logout', content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 401)


if __name__ == '__main__':
    unittest.main()
