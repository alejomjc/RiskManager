import json
import unittest
from app import app


class FlaskTest(unittest.TestCase):
    created_risk_id = None

    def setUp(self):
        self.app = app.test_client()

    def test_0_login(self):
        user = {
            'username': 'admin',
            'password': 'admin'
        }
        response = self.app.post('/login', json=user, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_1_create_risk(self):
        data = {
            'name': 'Break',
            'description': 'Break description',
            'user': 'admin',
            'provider': 'Nasa',
            'country': 'USA',
            'country_info': 'CO Colombia-Bogota',
            'impact': 'Hi',
            'probability': '64%',
            'level': '8'
        }

        response = self.app.post('/risk/create', json=data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

        response_data = json.loads(response.data)
        self.assertIsNotNone(response_data)
        FlaskTest.created_risk_id = response_data['risk_id']

    def test_2_get_risks(self):
        response = self.app.get('/risks')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

    def test_3_get_risk(self):
        response = self.app.get(f'/risk/{FlaskTest.created_risk_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

    def test_4_update_risk(self):
        data = {
            'name': 'Dead',
            'description': 'Break description updated',
            'user': 'admin',
            'provider': 'Army USA',
            'country': 'Canada',
            'country_info': 'CA Canada-Ottawa',
            'impact': 'Mid',
            'probability': '39%',
            'level': '2'
        }

        response = self.app.put(f'/risk/{FlaskTest.created_risk_id}', json=data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

        response = self.app.get(f'/risk/{FlaskTest.created_risk_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data)['name'], data['name'])
        self.assertEqual(json.loads(response.data)['description'], data['description'])
        self.assertEqual(json.loads(response.data)['user'], data['user'])
        self.assertEqual(json.loads(response.data)['provider'], data['provider'])
        self.assertEqual(json.loads(response.data)['country'], data['country'])
        self.assertEqual(json.loads(response.data)['country_info'], data['country_info'])
        self.assertEqual(json.loads(response.data)['impact'], data['impact'])
        self.assertEqual(json.loads(response.data)['probability'], data['probability'])
        self.assertEqual(json.loads(response.data)['level'], data['level'])

    def test_5_delete_risk(self):
        response = self.app.delete(f'/risk/{FlaskTest.created_risk_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

        response = self.app.get(f'/risk/{FlaskTest.created_risk_id}')
        self.assertEqual(response.status_code, 404)

    def test_6_logout(self):
        response = self.app.post('/logout', content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = self.app.get('/risks')
        self.assertEqual(response.status_code, 401)


if __name__ == '__main__':
    unittest.main()
