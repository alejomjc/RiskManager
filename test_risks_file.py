import json
import unittest
from app import app

headers = {
    'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZWpvbWpjIn0.pTwlSk50B1jzvAiCyar1qAXVwppKXlFPmmbrF8kgqnw"
}


class FlaskTest(unittest.TestCase):
    created_risk_id = None

    def setUp(self):
        self.app = app.test_client()

    def test_1_create_risk(self):
        data = {
            'name': 'Break',
            'user': 'usuario',
            'country': 'USA',
            'impact': 'Hi',
            'probability': '64%',
            'level': '8'
        }

        response = self.app.post('/risk/create', json=data, content_type='application/json', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

        response_data = json.loads(response.data)
        self.assertIsNotNone(response_data)
        FlaskTest.created_risk_id = response_data

    def test_2_get_risks(self):
        response = self.app.get('/risks', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

    def test_3_get_risk(self):
        response = self.app.get(f'/risk/{FlaskTest.created_risk_id}', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

    def test_4_update_risk(self):
        data = {
            'name': 'Dead',
            'country': 'Canada',
            'impact': 'Mid',
            'probability': '39%',
            'level': '2'
        }

        response = self.app.put(f'/risk/{FlaskTest.created_risk_id}', json=data, content_type='application/json',
                                headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

        response = self.app.get(f'/risk/{FlaskTest.created_risk_id}', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data)['name'], data['name'])
        self.assertEqual(json.loads(response.data)['country'], data['country'])
        self.assertEqual(json.loads(response.data)['impact'], data['impact'])
        self.assertEqual(json.loads(response.data)['probability'], data['probability'])
        self.assertEqual(json.loads(response.data)['level'], data['level'])

    def test_5_delete_risk(self):
        response = self.app.delete(f'/risk/{FlaskTest.created_risk_id}', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

        response = self.app.get(f'/risk/{FlaskTest.created_risk_id}', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), None)


if __name__ == '__main__':
    unittest.main()
